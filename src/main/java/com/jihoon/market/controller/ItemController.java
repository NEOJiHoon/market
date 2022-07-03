package com.jihoon.market.controller;

import com.jihoon.market.mapper.ItemMapper;
import com.jihoon.market.model.Item;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class ItemController {

    @Autowired
    ItemMapper itemMapper;

    @PostMapping(value = "/item/create")
    public int createItem(Item item) {
        log.info("create item: {}", item);
        return itemMapper.insertItem(item);
    }

    @PostMapping(value="/item/modify")
    public int modifyItem(Item item) {
        log.info("modify item: {}", item);
        return itemMapper.updateItem(item);
    }

    @PostMapping(value="/item/delete")
    public int deleteItem(@RequestParam String memId, @RequestParam Long itemNo) {
        log.info("::키:: 멤버ID:{}, 아이템번호:{}", memId, itemNo);
        Item item = new Item();
        item.setMemId(memId);
        item.setItemNo(itemNo);
        return itemMapper.deleteItem(item);
    }

    @GetMapping(value="/item")
    public List<Item> getItemList() {
        List<Item> itemList = itemMapper.selectItemList();
        log.info(":: 아이템 목록 :: {}", itemList);
        return itemList;
    }

}
