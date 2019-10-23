export class Sidebar {
  component: string;
  params?: SidebarParams;
}

export class MetadataBar {
  show: boolean;
  component: string;
  params?: SidebarParams;
}


/**
 * @param name represent file, envelop or folder name
 * @param type envelop or folder (for show the correct icon)
 * @param envelopClosed bool to add or remove action button to 'create folder'
 * @param tabtype envelop or file
 *
 * @export
 * @class SidebarParams
 */
export class SidebarParams {
  name: string;
  type: string;
  envelopClosed?: boolean;
  tabtype: string;
}
