package com.jihoon.market.mapper;

import com.jihoon.market.model.ItemChat;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemChatMapper {

    int insertItemChat(ItemChat itemChat);

    List<ItemChat> selectItemChatList(Map<String, Object> map);

    long selectNextChatNo(ItemChat itemChat);
}
