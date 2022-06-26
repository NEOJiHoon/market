package com.jihoon.market.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {
    private String memId;
    private String memNm;
    private String nicNm;
    private String memPw;
    private String memCp;
    private byte[] memImg;
}
