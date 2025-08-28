export const getArticleStyles = (size = "medium") => {
  switch (size) {
    case "headline":
      return {
        container: "mb-6 p-[16px] rounded-[5px]",
        image:
          "w-full h-80 object-cover rounded-[5px] mb-4 grayscale hover:grayscale-0 transition-all duration-300",
        title: "text-[1.9rem]  font-bold leading-tight uppercase",
        content: "text-base leading-relaxed columns-2 gap-6 p-[12px]",
        meta: "text-sm text-gray-600 mb-3",
      };

    case "spotlight":
      return {
        container:
          "mb-5 p-[12px] rounded-[5px] h-auto min-h-[600px] flex flex-col",
        image:
          "w-full h-[250px] object-cover rounded-[5px] mb-3 grayscale hover:grayscale-0 transition-all duration-300",
        title: "text-[1.9rem] font-bold leading-tight uppercase p-[8px]",
        content: "text-sm leading-relaxed p-[8px] flex-1",
        meta: "text-xs text-gray-600 p-[8px]",
      };

    case "horizontal":
      return {
        container: "mb-6 p-[16px] rounded-[5px] flex gap-6",
        image:
          "w-[500px] h-[400px] object-cover rounded-[5px] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300",
        contentWrapper: "flex-1 flex flex-col",
        title: "text-[1.9rem]  font-bold leading-tight uppercase p-[8px]",
        content: "text-base leading-relaxed p-[8px] flex-1",
        meta: "text-sm text-gray-600 p-[8px]",
      };

    case "horizontal-reverse":
      return {
        container: "mb-6 p-[16px] rounded-[5px] flex flex-row-reverse gap-6",
        image:
          "w-[500px] h-[400px] object-cover rounded-[5px] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300",
        contentWrapper: "flex-1 flex flex-col",
        title: "text-[1.9rem]  font-bold leading-tight uppercase p-[8px]",
        content: "text-base leading-relaxed p-[8px] flex-1",
        meta: "text-sm text-gray-600 p-[8px]",
      };

    case "secondary":
      return {
        container: "mb-5 p-[16px] rounded-[5px]",
        image:
          "w-full h-48 object-cover rounded-[5px] mb-4 grayscale hover:grayscale-0 transition-all duration-300",
        title: "text-[1.9rem]  font-bold mb-3 leading-tight uppercase",
        content: "text-sm leading-relaxed p-[12px]",
        meta: "text-sm text-gray-600 mb-3",
      };

    case "tertiary":
      return {
        container: "mb-4 p-[12px] rounded-[5px]",
        image:
          "w-full h-24 object-cover rounded-[5px] mb-3 grayscale hover:grayscale-0 transition-all duration-300",
        title: "text-[1.9rem] font-bold leading-tight uppercase",
        content: "text-xs leading-tight p-[8px]",
        meta: "text-xs text-gray-600 mb-2",
      };

    case "medium":
      return {
        container: "mb-5 p-[16px] rounded-[5px]",
        image:
          "w-full h-40 object-cover rounded-[5px] mb-4 grayscale hover:grayscale-0 transition-all duration-300",
        title: "text-[1.9rem] font-bold mb-3 leading-tight uppercase",
        content: "text-sm leading-relaxed p-[12px]",
        meta: "text-sm text-gray-600 mb-3",
      };

    case "small":
      return {
        container: "mb-4 p-[12px] rounded-[5px]",
        image:
          "w-full h-24 object-cover rounded-[5px] mb-3 grayscale hover:grayscale-0 transition-all duration-300",
        title: "text-[1.9rem] font-bold leading-tight uppercase",
        content: "text-xs leading-relaxed p-[8px]",
        meta: "text-xs text-gray-600 mb-2",
      };

    case "tiny":
      return {
        container: "mb-4 p-[8px]",
        image:
          "w-full h-20 object-cover rounded-[5px] mb-2 grayscale hover:grayscale-0 transition-all duration-300",
        title: "text-[1.9rem] font-bold leading-tight uppercase",
        content: "text-xs leading-relaxed p-[8px]",
        meta: "text-xs text-gray-600 mb-1",
      };

    default:
      return {
        container: "mb-5 p-[16px] rounded-[5px]",
        image:
          "w-full h-40 object-cover rounded-[5px] mb-4 grayscale hover:grayscale-0 transition-all duration-300",
        title: "text-[1.9rem] font-bold mb-3 leading-tight uppercase",
        content: "text-sm leading-relaxed p-[12px]",
        meta: "text-sm text-gray-600 mb-3",
      };
  }
};
