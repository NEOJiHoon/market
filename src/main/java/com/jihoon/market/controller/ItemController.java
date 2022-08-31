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

    @PutMapping("/soldout")
    public int soldOutItem(@RequestParam String memId, @RequestParam Long itemNo,
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
        // 위 검증로직을 다 통과한 이후 아이템점보를 DB로 부터 가져온다.
        Map<String, Object> map = new HashMap<>(); // 두개의 파라미터를 넘기기 위해 맵(map)을 사용
        map.put("memId", memId);
        map.put("itemNo", itemNo);
        Item item = itemMapper.selectItem(map); // DB로 부터 item 객체를 가져옴
        item.setSoldOutYn("Y"); // item 객체의 soldout 여부를 Y로 수정
        item.setSoldOutDt(LocalDateTime.now()); // item 객체의 soldout 시간을 현재시간으로 수정
        return itemMapper.updateItem(item); // 수정된 item 객체를 DB에 반영(업데이트)한다. 그리고 그 결과값을 리턴한다.
    }

    // 브라우저에서 아래와 같이 요청
    // type:"GET",
    // url:"/item?type=" + searchType, (searchType: 0:전체, 1:판매중. 2:판매완료)
    // 두번째 인자로 + "&itemTp=" + g_item_type (itemTp: 1:의류, 2:가전, 3:도서, 4:식품, 5:주방, 6:생활잡화)
    // 세번째 인자로 + "&searchWord=" + g_search_word (검색어로 제목을 검색)
    @GetMapping()
    public List<Item> getItemList(@RequestParam(required = false, defaultValue = "0") int type,
                                  @RequestParam(required = false, defaultValue = "0") int itemTp,
                                  @RequestParam(required = false, defaultValue = "") String searchWord) {
        // itemMapper 매퍼에 2개의 인자(파라미터 type, itemTp)를 전달하기 위해서 map(자료형)에 담아서 전달
        // 제목을 검색할 검색어에 대한 인자 1개를 추가로 맵(map)에 넣는다.
        Map<String, Object> map = new HashMap<>();
        map.put("type", type);
        map.put("itemTp", itemTp);
        map.put("searchWord", searchWord);
        List<Item> itemList = itemMapper.selectItemList(map);
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
