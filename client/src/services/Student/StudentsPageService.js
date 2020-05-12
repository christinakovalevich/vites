import RoleService from "../Role/RoleService";

const _isStudentsModeValid = mode =>
    Object.values(_MODES).some(it => it.value === mode);

const _MODES = {
    ALL: {
        value: 'MODE_ALL',
        label: 'Всех студентов',
    },
    MY: {
        value: 'MODE_MY',
        label: 'Моих студентов',
    },
}

export default {
    modes: {
        all: () =>
            _MODES.ALL.value,
        my: () =>
            _MODES.MY.value,
    },

    sortStudents(students) {
        return [...students]
    },

    getLabelForMode: mode => {
        if (_isStudentsModeValid(mode)) {
            return Object.values(_MODES)
                .find(it => it.value === mode).label;
        } else {
            console.error('Unknown mode:', mode);
            return null;
        }
    },

    isModeValid: _isStudentsModeValid,

    isActiveMode: (activeMode, currentMode) => activeMode === currentMode,

    isShowToggle: (userRole) => [RoleService.mentor()].includes(userRole)

};