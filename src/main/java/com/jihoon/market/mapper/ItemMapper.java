package com.jihoon.market.mapper;

import com.jihoon.market.model.Item;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemMapper {

    int insertItem(Item item);

    int updateItem(Item item);

    int deleteItem(Item item);

    // 아래 두개 파라미터(인자)가 map 맵에 담겨서 전달된다.
    // (type: 0:전체, 1:판매중, 2:판매완료)
    // (itemTp: itemTp: 1.의류, 2.가전, 3.도서, 4.식품, 5.주방, 6.생활잡화)
    List<Item> selectItemList(Map<String, Object> map);

    Long selectNextItemNo(String id);

    Item selectItem(Map<String, Object> map);
}
