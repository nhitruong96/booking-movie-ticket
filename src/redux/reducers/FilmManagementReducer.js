
const stateDefault = {
    arrFilm: [
        {
            "maPhim": 10558,
            "tenPhim": "LIÊN MINH SIÊU THÚ DC 23",
            "biDanh": "lien-minh-sieu-thu-dc-23",
            "trailer": "https://www.youtube.com/watch?v=L2umMe5uRnk",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/lien-minh-sieu-thu-dc_gp01.jpg",
            "moTa": "Trong “Liên Minh Siêu Thú DC”, Siêu Cún Krypto và Superman là cặp bài trùng không thể tách rời, cùng sở hữu những siêu năng lực tương tự và cùng nhau chiến đấu chống lại tội phạm tại thành phố Metropolis. Khi Superman và những thành viên của Liên Minh Công Lý bị bắt cóc, Krypto phải thuyết phục cậu chàng Ace luộm thuộm, nàng Heo PB, Rùa Merton và Sóc Chip khai phá những sức mạnh tiềm ẩn và cùng nhau giải cứu các siêu anh hùng. “Liên Minh Siêu Thú DC” có sự góp giọng của bộ đôi ngôi sao nổi tiếng bậc nhất Hollywood Dwayne Johnson (lồng tiếng cho Siêu cún Krypto) và Kevin Hart (Superman). Đặc biệt, tài tử Keanu Reeves sẽ đảm nhận những câu thoại chất lừ đến từ Batman.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-10-03T11:09:28.71",
            "danhGia": 8,
            "hot": false,
            "dangChieu": false,
            "sapChieu": true
        },
        {
            "maPhim": 10558,
            "tenPhim": "LIÊN MINH SIÊU THÚ DC 23",
            "biDanh": "lien-minh-sieu-thu-dc-23",
            "trailer": "https://www.youtube.com/watch?v=L2umMe5uRnk",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/lien-minh-sieu-thu-dc_gp01.jpg",
            "moTa": "Trong “Liên Minh Siêu Thú DC”, Siêu Cún Krypto và Superman là cặp bài trùng không thể tách rời, cùng sở hữu những siêu năng lực tương tự và cùng nhau chiến đấu chống lại tội phạm tại thành phố Metropolis. Khi Superman và những thành viên của Liên Minh Công Lý bị bắt cóc, Krypto phải thuyết phục cậu chàng Ace luộm thuộm, nàng Heo PB, Rùa Merton và Sóc Chip khai phá những sức mạnh tiềm ẩn và cùng nhau giải cứu các siêu anh hùng. “Liên Minh Siêu Thú DC” có sự góp giọng của bộ đôi ngôi sao nổi tiếng bậc nhất Hollywood Dwayne Johnson (lồng tiếng cho Siêu cún Krypto) và Kevin Hart (Superman). Đặc biệt, tài tử Keanu Reeves sẽ đảm nhận những câu thoại chất lừ đến từ Batman.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-10-03T11:09:28.71",
            "danhGia": 8,
            "hot": false,
            "dangChieu": false,
            "sapChieu": true
        },
    ]
}

export const FilmManagementReducer = (state = stateDefault, action) => {
    switch (action.type) {

        default: return { ...state }
    }
}   
