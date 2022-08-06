package com.jihoon.market.config;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jihoon.market.model.ItemChat;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class ChatDecoder implements Decoder.Text<ItemChat>{

    @Override
    public ItemChat decode(String s) throws DecodeException {
        ObjectMapper mapper = new ObjectMapper();
        ItemChat result;
        try {
            result = mapper.readValue(s, ItemChat.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    @Override
    public boolean willDecode(String s) {
        return true;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
