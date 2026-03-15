package com.coder_amit.util;

import java.util.UUID;

public class ReferralCodeGenerator {

    public static String generateCode() {
        return UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 6)
                .toUpperCase();
    }
}