package com.jihoon.market.controller;

import com.jihoon.market.mapper.ItemChatMapper;
import com.jihoon.market.model.ChatAlert;
import com.jihoon.market.model.ItemChat;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List<ItemChat> getItemChatList(@RequestParam String memId,
                                          @RequestParam Long itemNo,
                                          @RequestParam String toMemId) {
        Map<String, Object> map = new HashMap<>();
        map.put("memId", memId);
        map.put("itemNo", itemNo);
        map.put("toMemId", toMemId);
        List<ItemChat> itemChatList = itemChatMapper.selectItemChatList(map);
        log.info("아이템 채팅 목록 갯수: {}", itemChatList.size()); // 갯수만 서버로그에 출력
        return itemChatList;
    }

    @GetMapping("/alert")
    public List<ChatAlert> getChatAlertList(@RequestParam String memId) {
        log.info("chat alert list memId: {}",memId);
        List<ChatAlert> chatAlertList = itemChatMapper.selectChatAlertList(memId);
        log.info("chat alert list size: {}", chatAlertList.size()); // 갯수만 서버로그에 출력
        return chatAlertList;
    }

}
