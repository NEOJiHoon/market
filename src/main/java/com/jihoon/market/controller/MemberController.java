package com.jihoon.market.controller;

import com.jihoon.market.mapper.MemberMapper;
import com.jihoon.market.model.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class MemberController {

    @Autowired
    MemberMapper memberMapper;

    @PostMapping(value = "/member/create")
    public int createMember(Member member) {
        log.info("create member: {}", member);
        return memberMapper.insertMember(member);
    }
}
