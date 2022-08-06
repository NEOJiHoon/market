package com.jihoon.market.config;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jihoon.market.model.ItemChat;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class ChatEncoder implements Encoder.Text<ItemChat>{

    @Override
    public String encode(ItemChat itemChat) throws EncodeException {
        ObjectMapper mapper = new ObjectMapper();
        String result;
        try {
            result = mapper.writeValueAsString(itemChat);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
