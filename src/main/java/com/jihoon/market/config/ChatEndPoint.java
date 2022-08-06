package com.jihoon.market.config;

import com.jihoon.market.model.ItemChat;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

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

    }

    @OnClose
    public void chatClose(Session session, @PathParam("memId") String memId) {
        ChatBox.box.remove(memId);
        log.info("chat close: {} box: {}", memId, ChatBox.box);
    }

    @OnError
    public void chatError(Session session, Throwable error, @PathParam("memId") String memId) {

    }
}
