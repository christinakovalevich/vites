import RoleService from "../Role/RoleService";

const _isMentorModeValid = mode =>
    Object.values(_MODES).some(it => it.value === mode);

const _MODES = {
    ALL: {
        value: 'MODE_ALL',
        label: 'Всех преподавателей',
    },
    MY: {
        value: 'MODE_MY',
        label: 'Моих преподавателей',
    },
}

export default {
    modes: {
        all: () =>
            _MODES.ALL.value,
        my: () =>
            _MODES.MY.value,
    },

    sortMentors(mentors) {
        return [...mentors]
    },

    getLabelForMode: mode => {
        if (_isMentorModeValid(mode)) {
            return Object.values(_MODES)
                .find(it => it.value === mode).label;
        } else {
            console.error('Unknown mode:', mode);
            return null;
        }
    },

    isModeValid: _isMentorModeValid,

    isActiveMode: (activeMode, currentMode) => activeMode === currentMode,

    isShowToggle: (userRole) => [RoleService.student()].includes(userRole)
}