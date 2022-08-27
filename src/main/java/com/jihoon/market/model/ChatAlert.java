package com.jihoon.market.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatAlert {
    private String memId;
    private Long itemNo;
    private String toMemId;
    private String title;
    private String nicNm;
    private byte[] memImg;
}
