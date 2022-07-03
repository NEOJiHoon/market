package com.jihoon.market.mapper;

import com.jihoon.market.model.Item;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ItemMapper {

    int insertItem(Item item);

    int updateItem(Item item);

    int deleteItem(Item item);

    List<Item> selectItemList();

}
