package com.jihoon.market.config;

import com.jihoon.market.mapper.ItemChatMapper;
import com.jihoon.market.model.ItemChat;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@Slf4j
@Component
@ServerEndpoint(
        value = "/chat/{memId}/{toMemId}",
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
                         @PathParam("toMemId") String toMemId) {
        this.session = session;
        ChatBox.box.put(memId, this);
        log.info("Chat open Id: {} box: {}", memId, ChatBox.box);

    }

    @OnMessage
    public void chatMessage(ItemChat itemChat, @PathParam("memId") String memId,
                            @PathParam("toMemId") String toMemId) {
        log.info("{} : {}", itemChat.getMemId(), itemChat.getMsg());

        // 메시지 보내기
        itemChat.setToMemId(toMemId);
        itemChat.setMsg(itemChat.getMsg());
        itemChat.setItemNo(1L);
        long nextChatNo = itemChatMapper.selectNextChatNo(itemChat);
        itemChat.setChatNo(nextChatNo);
        talk(itemChat);
    }

    @OnClose
    public void chatClose(Session session, @PathParam("memId") String memId,
                          @PathParam("toMemId") String toMemId) {
        ChatBox.box.remove(memId);
        log.info("chat close: {} box: {}", memId, ChatBox.box);
    }

    @OnError
    public void chatError(Session session, Throwable error, @PathParam("memId") String memId,
                          @PathParam("toMemId") String toMemId) {

    }

    public void talk(ItemChat itemChat) {
        // DB에 내용을 저장(상대방이 온라인이던/오프라인이던 저장)
        itemChatMapper.insertItemChat(itemChat);

        String toMemId = itemChat.getToMemId();
        if (ChatBox.box.containsKey(toMemId)) {
            // 상대방이 온라인 상태인 경우
            ChatEndPoint cep = ChatBox.box.get(toMemId);
            try {
                // 브라우저로 메시지를 전달 (휘발성)
                cep.session.getBasicRemote().sendObject(itemChat);
            } catch (IOException | EncodeException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
