package com.jihoon.market.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jihoon.market.mapper.MemberMapper;
import com.jihoon.market.model.Member;
import com.jihoon.market.util.SHA256;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RequestMapping("/member")
@RestController
public class MemberController {

    @Autowired
    MemberMapper memberMapper;

    @PostMapping()
    public int createMember(@RequestBody Member member) {
        log.info("create member: {}", member);

        if (member.getMemNm() == null || member.getMemNm().trim().equals("")) {
            return -4; // 이름을 입력해주세요.
        }
        if (member.getNicNm() == null || member.getNicNm().trim().equals("")) {
            return -5; // 닉네임을 입력해주세요.
        }
        if (member.getMemCp() == null || member.getMemCp().trim().equals("")) {
            return -7; // 휴대폰번호를 입력해주세요.
        }
        if (member.getMemId() == null || member.getMemId().trim().equals("")) {
            return -3; // ID를 입력해주세요.
        }
        if (member.getMemPw() == null || member.getMemPw().trim().equals("")) {
            return -6; // 패스워드를 입력해주세요.
        }

        int result = -1;
        try {
            String pw = member.getMemPw();
            String hash = SHA256.encrypt(pw);
            member.setMemPw(hash);

            result = memberMapper.insertMember(member);
        } catch (DataIntegrityViolationException e) { // 데이터 무결성 위반 인경우
            log.warn(" --- 중복 ---" );
            // 아이디가 중복됐습니다. 다른 아이디로 가입해주세요.
            result = -2;
        } catch (Exception e) {
            log.warn(" --- 알 수 없는 오류발생 --- ");
            result = -1;
        }
        return result;

    }

    @PutMapping()
    public int modifyMember(@RequestParam(value = "memImg", required = false)MultipartFile file,
                            @RequestParam("member") String memberString) throws IOException {
        log.info("modify member: {}", memberString);

        ObjectMapper objectMapper = new ObjectMapper();
        Member member = objectMapper.readValue(memberString, Member.class);

        if (file != null) {
            // 파일이 있는 경우 파일을 멤버에 셋한다.
            member.setMemImg(file.getBytes());
        }
        return memberMapper.updateMember(member);
    }

    @GetMapping
    public Member getMember(@RequestParam String memId) {
        Member member = memberMapper.selectMember(memId);
        log.info("get member: {}", member);
        return member;
    }
}
