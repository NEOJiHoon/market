package com.jihoon.market.config;

import com.jihoon.market.code.Const;
import com.jihoon.market.mapper.ItemChatMapper;
import com.jihoon.market.model.ItemChat;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@Slf4j
@Component
@Scope("prototype")
@ServerEndpoint(
        value = "/chat/{toMemId}/{memId}/{itemNo}/{writerTp}",
        encoders = {ChatEncoder.class},
        decoders = {ChatDecoder.class},
        configurator = CustomSpringConfigurator.class
)
public class ChatEndPoint {

    @Autowired
    ItemChatMapper itemChatMapper;

    private Session session;

    @OnOpen
    public void chatOpen(Session session, @PathParam("memId") String memId,
                         @PathParam("toMemId") String toMemId,
                         @PathParam("itemNo") long itemNo,
                         @PathParam("writerTp") int writerTp) {
        this.session = session;
        ChatBox.box.put(toMemId, this);
        log.info("Chat open Id: {} box: {}", toMemId, ChatBox.box);

    }

    @OnMessage
    public void chatMessage(ItemChat itemChat, @PathParam("memId") String memId,
                            @PathParam("toMemId") String toMemId,
                            @PathParam("itemNo") long itemNo,
                            @PathParam("writerTp") int writerTp) {
        log.info("{} : {}", toMemId, itemChat.getMsg());

        // 메시지 보내기
        if (Const.WRITER_TP_BUYER == writerTp) {
            // 구매인 경우
            itemChat.setMemId(memId);
            itemChat.setToMemId(toMemId);
        } else {
            // 판매자인 경우
            itemChat.setMemId(toMemId);
            itemChat.setToMemId(memId);
        }

        itemChat.setMsg(itemChat.getMsg());
        itemChat.setItemNo(itemNo);
        long nextChatNo = itemChatMapper.selectNextChatNo(itemChat);
        itemChat.setChatNo(nextChatNo);
        itemChat.setWriterTp(writerTp);
        talk(itemChat);
    }

    @OnClose
    public void chatClose(Session session, @PathParam("memId") String memId,
                          @PathParam("toMemId") String toMemId,
                          @PathParam("itemNo") long itemNo,
                          @PathParam("writerTp") int writerTp) {
        ChatBox.box.remove(toMemId);
        log.info("chat close: {} box: {}", toMemId, ChatBox.box);
    }

    @OnError
    public void chatError(Session session, Throwable error, @PathParam("memId") String memId,
                          @PathParam("toMemId") String toMemId,
                          @PathParam("itemNo") long itemNo,
                          @PathParam("writerTp") int writerTp) {
        log.error("chat error: {}", session.getId(), error);
    }

    public void talk(ItemChat itemChat) {
        // DB에 내용을 저장(상대방이 온라인이던/오프라인이던 저장)
        itemChatMapper.insertItemChat(itemChat);

        String otherTarget;
        if (Const.WRITER_TP_BUYER == itemChat.getWriterTp()) {
            // 구매인 경우
            otherTarget = itemChat.getMemId();
        } else {
            // 판매자인 경우
            otherTarget = itemChat.getToMemId();
        }
        if (ChatBox.box.containsKey(otherTarget)) {
            // 상대방이 온라인 상태인 경우
            ChatEndPoint cep = ChatBox.box.get(otherTarget);
            try {
                // 브라우저로 메시지를 전달 (휘발성)
                cep.session.getBasicRemote().sendObject(itemChat);
            } catch (IOException | EncodeException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
