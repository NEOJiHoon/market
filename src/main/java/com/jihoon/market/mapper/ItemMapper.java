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

    // (type: 0:전체, 1:판매중, 2:판매완료)
    List<Item> selectItemList(int type);

    Long selectNextItemNo(String id);

    Item selectItem(Map<String, Object> map);
}
