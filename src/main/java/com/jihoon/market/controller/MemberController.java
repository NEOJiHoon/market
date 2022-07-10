package com.jihoon.market.controller;

import com.jihoon.market.mapper.MemberMapper;
import com.jihoon.market.model.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/member")
@RestController
public class MemberController {

    @Autowired
    MemberMapper memberMapper;

    @PostMapping()
    public int createMember(@RequestBody Member member) {
        log.info("create member: {}", member);
        return memberMapper.insertMember(member);
    }

    @PutMapping()
    public int modifyMember(Member member) {
        log.info("modify member: {}", member);
        return memberMapper.updateMember(member);
    }
}
