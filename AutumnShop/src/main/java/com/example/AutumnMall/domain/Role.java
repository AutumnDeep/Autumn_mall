package com.example.AutumnMall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="role")
@NoArgsConstructor
@Setter
@Getter
public class Role {
    @Id
    @Column(name="role_id")
    private Long roleId;

    @Column(length = 20)
    private String name;

    @Override
    public String toString() {
        return "Role{" +
                "roleId=" + roleId +
                ", name='" + name + '\'' +
                '}';
    }
}