export interface Student {
    id: string;
    stud_Fname: string;
    stud_Mname?: string;
    stud_Lname: string;
    stud_yr: number;
    program: string;
    stud_email: string;
    login_pw: string;
    advisor: string;
    status: string;
    address: string;
    contact_num: string;
}

export interface Advisor {
    id: string;
    name: string;
    email: string;
    department: string;
}

export interface Section {
    sect_ID: number;
    course_id: string;
    inst_ID: number;
    sect_name: string;
    sect_days: string;
    sect_start_time: string;
    sect_end_time: string;
    sect_status: string;
    Room?: {
        room_name: string;
        room_capac: string;
    };
    SectionAvailability?: {
        avail_enrollTot: number;
        avail_waistlistTot: number;
        avail_waitlistCap: number;
    };
}

export interface CourseSearchResult {
    crs_ID: string;
    crs_code: string;
    crs_name: string;
    crs_units: number;
    sect_ID: number;
    sect_days: string;
    sect_start_time: string;
    sect_end_time: string;
    sect_status: string;
    crs_instructor: string;
    room_name: string;
    room_capac: string | number;
    avail_enrollTot: number;
    avail_waistlistTot: number;
    avail_waitlistCap: number | string;
    sect_name: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

export interface Instructor {
    inst_ID: number;
    inst_fname: string;
    inst_lname: string;
    inst_email: string;
    department: string;
    status: string;
}

export interface CartItem {
    cart_id: number;
    sect_ID: number;
    course_id: string;
    sect_name: string;
    sect_days: string;
    sect_start_time: string;
    sect_end_time: string;
    crs_code: string;
    crs_name: string;
}
