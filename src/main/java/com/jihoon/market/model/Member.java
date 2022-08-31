package com.jihoon.market.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"memImg"}) // 이미지 바이트가 서버로그에 찍히지 않도록 문자열 출력시 제외시킴
public class Member {
    private String memId;
    private String memNm;
    private String nicNm;
    private String memPw;
    private String memCp;
    private byte[] memImg;
}
