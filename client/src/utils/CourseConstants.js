export const coursesPageModes = {
    ALL: 'ALL',
    MY: 'MY',
};

export const isCourseModeValid = mode =>
    Object.values(coursesPageModes).includes(mode);
