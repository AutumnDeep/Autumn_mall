package com.example.AutumnMall.dto;

import com.example.AutumnMall.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class AddOrderDto {
    private Long memberId;
}
