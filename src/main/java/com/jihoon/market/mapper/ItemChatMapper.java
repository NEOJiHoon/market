package com.jihoon.market.mapper;

import com.jihoon.market.model.ItemChat;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ItemChatMapper {

    int insertItemChat(ItemChat itemChat);
}
