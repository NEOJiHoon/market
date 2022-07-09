package com.jihoon.market.controller;

import com.jihoon.market.mapper.ItemChatMapper;
import com.jihoon.market.model.ItemChat;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/item/chat")
public class ItemChatController {

    @Autowired
    ItemChatMapper itemChatMapper;

    @PostMapping
    public int insertItemChat(@RequestBody ItemChat itemChat) {
        log.info("아이템 채팅 요청정보: {}", itemChat);
        return itemChatMapper.insertItemChat(itemChat);
    }

    @GetMapping
    public List<ItemChat> getItemChatList() {
        List<ItemChat> itemChatList = itemChatMapper.selectItemChatList();
        log.info("아이템 채팅 목록: {}", itemChatList);
        return itemChatList;
    }

}
