package com.example.entity.medicalhistory;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum BloodFactorType {
    WBC(6., 16.5, "Leukocyty"),
    RBC(5.5, 8.5, "Erytrocyty"),
    HEMOGLOBINA(12.002, 17.995, "Hemoglobina"),
    HCT(37., 55., "Hematokryt"),
    MCV(60., 77., "Średnia objętość erytrocytu"),
    MCH(19., 25., "Średnia zawartość hemoglobiny w erytrocycie"),
    MCHC(32., 36., "Średnia zawartość hemoglobiny w erytrocytach"),
    PLT(200., 500., "Płytki krwi"),
    MPV(null, null, "Średnia objętość trombocytów"),
    RDW(14., 17.9, "Widmo erytrocytów"),
    LIMFOCYTY(1., 4.8, "Limfocyty"),
    LYM(12., 30., "% LYM"),
    MONOCYTY(0.2, 1.4, "Monocyty"),
    MONO(3., 10., "% MONO"),
    GRANULOCYTY(1., 9.9, "Granulocyty"),
    GRANS(60., 77., "% GRANS");

    private final Double minValue;

    private final Double maxValue;

    private final String fullName;

    public static BloodFactorType valueOfFullName(String name) {
        for (BloodFactorType type : values()) {
            if (type.fullName.equals(name)) {
                return type;
            }
        }
        throw new IllegalArgumentException(name);
    }
}
