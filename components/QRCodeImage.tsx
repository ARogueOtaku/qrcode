import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import QRCode from "qrcode";
import type { QRCodeRenderersOptions } from "qrcode";

export interface IQRCodeImageProps {
  data: string;
  alt: string;
  size?: number;
  qrOptions?: QRCodeRenderersOptions;
}

export default function QRCodeImage({
  data,
  alt,
  size = 16,
  qrOptions = {},
}: IQRCodeImageProps) {
  const [src, setSrc] = useState<string>("");

  const fetchSrc = useCallback(async () => {
    setSrc(await QRCode.toDataURL(data, qrOptions));
  }, [data, qrOptions]);

  useEffect(() => {
    fetchSrc();
  }, [fetchSrc]);

  return <Image src={src} alt={alt} width={size} height={size} />;
}
