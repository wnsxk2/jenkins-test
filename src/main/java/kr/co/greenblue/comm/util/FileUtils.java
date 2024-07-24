package kr.co.greenblue.comm.util;

import java.io.File;

public class FileUtils {
    /**
     * 폴더 만들기 메소드
     *
     * @param folder 폴더명
     */
    public static boolean makeFolder(String folder) {
        if (folder.length() < 0) return false;
        String path = folder;
        // 폴더 경로
        File Folder = new File(path);
        // 해당 디렉토리가 없을경우 디렉토리를 생성
        if (!Folder.exists()) {
            try {
                // 폴더 생성gka
                Folder.mkdirs();
            } catch (NullPointerException e) {
               // logger.error("makeFolder err:: "+ e.getLocalizedMessage());
            }
        } else {
            System.out.println("이미 폴더가 생성되어 있습니다.");
        }
        return true;
    }

}
