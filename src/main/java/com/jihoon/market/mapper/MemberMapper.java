package com.jihoon.market.mapper;

import com.jihoon.market.model.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    int insertMember(Member member);

    int updateMember(Member member);
}
