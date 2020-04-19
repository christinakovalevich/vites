package enums.tecnology

import groovy.transform.CompileStatic

@CompileStatic
enum TechnologyDifficulty {

    ELEMENTARY(1),
    EASY(2),
    NORMAL(4),
    MEDIUM(5),
    DIFFICULT(7),
    STRONG(9),
    HARD(10)

    TechnologyDifficulty(int value) {
        this.value = value
    }
    private final int value

    int getValue() {
        return value
    }
}