import { Modal, StyleProp, ImageStyle, Platform } from "react-native";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { DefaultColor } from "../../constants/Colors";
import ImageViewer from "react-native-image-zoom-viewer";

interface IProps {
  title: string;
  visible: boolean;
  uri: any;
  onClose?: () => void;
  onPress?: () => void;
  imageStyle?: StyleProp<ImageStyle>;
}

export default function ModalViewLocalImage(props: IProps) {
  const images = [
    {
      url: "",
      props: {
        source: props.uri,
      },
    },
  ];
  return (
    <Modal visible={props.visible} transparent={true}>
      <ImageViewer
        imageUrls={images}
        renderHeader={(index) => (
          <Ionicons
            name="close-outline"
            size={40}
            style={{
              alignSelf: "flex-end",
              color: DefaultColor.white,
              marginRight: 10,
              marginTop: Platform.OS === "ios" ? 35 : 0,
            }}
            onPress={props.onClose}
          />
        )}
      />
    </Modal>
  );
}
