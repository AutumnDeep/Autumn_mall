package com.example.AutumnMall.domain;

import javax.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;


@Embeddable
@Setter
@Getter
public class Rating {
    private Double rate;
    private Integer count;
}

