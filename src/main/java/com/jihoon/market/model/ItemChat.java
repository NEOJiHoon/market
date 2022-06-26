package com.jihoon.market.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ItemChat {
    private String memId;
    private Long itemNo;
    private String toMemId;
    private Long chatNo;
    private String msg;
    private LocalDateTime createDt;
}
