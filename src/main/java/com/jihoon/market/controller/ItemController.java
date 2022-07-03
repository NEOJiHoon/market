package com.jihoon.market.controller;

import com.jihoon.market.mapper.ItemMapper;
import com.jihoon.market.model.Item;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
