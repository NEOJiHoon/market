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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public int deleteItem(@RequestParam String memId, @RequestParam Long itemNo,
                          HttpServletRequest request) {
        log.info("::키:: 멤버ID:{}, 아이템번호:{}", memId, itemNo);
        HttpSession session = request.getSession();
        String id = (String) session.getAttribute("id");
        if (!request.isRequestedSessionIdValid() || id == null || id.trim().equals("")) {
            // 로그인하지 않은 상태로 예외 처리
            return -1;
        }
        if (!id.equals(memId)) {
            // 다른사람의 글을 지울 수 없습니다.
            return -2;
        }

        Item item = new Item();
        item.setMemId(memId);
        item.setItemNo(itemNo);
        return itemMapper.deleteItem(item);
    }

    // 브라우저에서 아래와 같이 요청
    // type:"GET",
    // url:"/item?type=" + searchType, (searchType: 0:전체, 1:판매중. 2:판매완료)
    @GetMapping()
    public List<Item> getItemList(@RequestParam(required = false, defaultValue = "0") int type) {
        List<Item> itemList = itemMapper.selectItemList(type);
        log.info(":: 아이템 목록 :: {}", itemList);
        return itemList;
    }

    @GetMapping("/detail")
    public Item getItem(@RequestParam String memId, @RequestParam Long itemNo) {
        Map<String, Object> map = new HashMap<>();
        map.put("memId", memId);
        map.put("itemNo", itemNo);
        Item item = itemMapper.selectItem(map);
        log.info(":: 아이템 상세 :: {}", item);
        return item;
    }

}
