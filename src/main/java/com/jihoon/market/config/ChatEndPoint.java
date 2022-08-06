package com.jihoon.market.config;

import com.jihoon.market.model.ItemChat;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@Slf4j
@Component
@ServerEndpoint(
        value = "/chat/{memId}",
        encoders = {ChatEncoder.class},
        decoders = {ChatDecoder.class}
)
public class ChatEndPoint {

    private Session session;

    @OnOpen
    public void chatOpen(Session session, @PathParam("memId") String memId) {
        this.session = session;
        ChatBox.box.put(memId, this);
        log.info("Chat open Id: {} box: {}", memId, ChatBox.box);

    }

    @OnMessage
    public void chatMessage(ItemChat itemChat, @PathParam("memId") String memId) {
        log.info("{} : {}", itemChat.getMemId(), itemChat.getMsg());

        // 메시지 보내기
        itemChat.setToMemId(memId);
        itemChat.setMsg("잘받았다.");
        talk(itemChat);
    }

    @OnClose
    public void chatClose(Session session, @PathParam("memId") String memId) {
        ChatBox.box.remove(memId);
        log.info("chat close: {} box: {}", memId, ChatBox.box);
    }

    @OnError
    public void chatError(Session session, Throwable error, @PathParam("memId") String memId) {

    }

    public void talk(ItemChat itemChat) {
        String toMemId = itemChat.getToMemId();
        if (ChatBox.box.containsKey(toMemId)) {
            ChatEndPoint cep = ChatBox.box.get(toMemId);
            try {
                cep.session.getBasicRemote().sendObject(itemChat);
            } catch (IOException | EncodeException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
