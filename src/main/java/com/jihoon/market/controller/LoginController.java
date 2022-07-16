package com.jihoon.market.controller;


import com.jihoon.market.model.Member;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/login")
@RestController
public class LoginController {
    @PostMapping
    public String login(@RequestBody Member member) {
        String id = member.getMemId();
        String pw = member.getMemPw();
        if (id == null || "".equals(id.trim())) {
            return "아이디를 정확히 입력하세요.";
        } else if (pw == null || "".equals(pw.trim())) {
            return "패스워드를 정확히 입력하세요.";
        }

        return "success";
    }
}
