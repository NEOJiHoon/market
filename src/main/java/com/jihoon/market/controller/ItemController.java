package com.jihoon.market.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jihoon.market.mapper.ItemMapper;
import com.jihoon.market.model.Item;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequestMapping("/item")
@RestController
public class ItemController {

    @Autowired
    ItemMapper itemMapper;

    @PostMapping()
    public int createItem(@RequestParam("image") MultipartFile file,
                          @RequestParam("item") String itemString,
                          HttpServletRequest request) throws IOException {
        log.info("create item: {}", itemString);
        HttpSession session = request.getSession();
        String id = (String) session.getAttribute("id");
        if (!request.isRequestedSessionIdValid() || id == null || id.trim().equals("")) {
            // 로그인하지 않은 상태로 예외 처리
            return -1;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        Item item = objectMapper.readValue(itemString, Item.class);
        item.setMemId(id);
        Long nextItemNo = itemMapper.selectNextItemNo(id);
        item.setItemNo(nextItemNo);
        item.setImgOne(file.getBytes());
        item.setCreateDt(LocalDateTime.now());
        item.setSoldOutYn("N");
        item.setDelYn("N");
        return itemMapper.insertItem(item);
    }

    @PutMapping()
    public int modifyItem(Item item) {
        log.info("modify item: {}", item);
        return itemMapper.updateItem(item);
    }

    @DeleteMapping()
    public int deleteItem(@RequestParam String memId, @RequestParam Long itemNo) {
        log.info("::키:: 멤버ID:{}, 아이템번호:{}", memId, itemNo);
        Item item = new Item();
        item.setMemId(memId);
        item.setItemNo(itemNo);
        return itemMapper.deleteItem(item);
    }

    @GetMapping()
    public List<Item> getItemList() {
        List<Item> itemList = itemMapper.selectItemList();
        log.info(":: 아이템 목록 :: {}", itemList);
        return itemList;
    }

}
