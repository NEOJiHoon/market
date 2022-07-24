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

    List<Item> selectItemList();

    Long selectNextItemNo(String id);

    Item selectItem(Map<String, Object> map);
}
