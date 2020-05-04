export const canvasMock = {
  getContext: () => {
    return {
      moveTo: () => { },
      lineTo: () => { },
      beginPath: () => { },
      clearRect: () => { },
      stroke: () => { },
      drawImage: () => { },
      getImageData: () => { },
      strokeStyle: "",
      lineWidth: "",
    }
  },
  toDataURL: () => { return {} },
  getBoundingClientRect: () => {
    return {
      left: 0,
      right: 0
    }
  },
  width: 600,
  height: 400,
  scrollWidth: 0,
  scrollHeight: 0,
}