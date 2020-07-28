#include <iostream>
#include <opencv2/opencv.hpp>
#include <cstdlib>

int main(void){
    // 画像の読み込み
    cv::Mat img = cv::imread("temp.png", 0);
    if(img.empty()){
        std::cerr << "画像を読み込めません" << std::endl;
        std::exit(EXIT_FAILURE);
    }

    std::uint16_t d[16] = {};
    bool dot;
    for(int i = 0; i < 16; i++){
        for(int j = 0; j < 16; j++){
            dot = (int)img.at<uchar>(i, j) ? false : true;
            // std::cout << (dot ? "\033[47m1\033[0m" : "0") << std::ends;
            d[i] |= dot ? 1 : 0;
            if(j == 15) break;
            d[i] <<= 1;
        }
        // std::cout << std::endl;
    }

    for(int i = 0; i < 16; i++)
        std::cout << d[i] << " " << std::ends;
    std::cout << std::endl;

    return 0;
}