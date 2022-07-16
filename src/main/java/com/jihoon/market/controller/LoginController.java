package com.jihoon.market.controller;


import com.jihoon.market.mapper.MemberMapper;
import com.jihoon.market.model.Member;
import com.jihoon.market.util.SHA256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;

@RequestMapping("/login")
@RestController
public class LoginController {

    @Autowired
    MemberMapper memberMapper;

    @PostMapping
    public String login(@RequestBody Member member) throws NoSuchAlgorithmException {
        String id = member.getMemId();
        String pw = member.getMemPw();
        if (id == null || "".equals(id.trim())) {
            return "아이디를 정확히 입력하세요.";
        } else if (pw == null || "".equals(pw.trim())) {
            return "패스워드를 정확히 입력하세요.";
        }
        Member dbMember = memberMapper.selectMember(id);
        String hash = SHA256.encrypt(pw);
        if (dbMember == null || !hash.equals(dbMember.getMemPw())) {
            return "잘못된 로그인 정보입니다.";
        }

        return "success";
    }
}
