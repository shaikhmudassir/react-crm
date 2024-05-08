import { Inbox } from "../../../common/types/common.type";
import { fetchData } from "../../../components/FetchData";
import { ChatContacts, ChatMessageHistory, LeadUrl } from "../../../services/ApiUrls";

export const getChatContacts = async () => {
  const Header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Token'),
    org: localStorage.getItem('org')
  }
  return await fetchData(`${ChatContacts}/`, 'GET', null as any, Header);
}

export const getMessageHistory = async (wa_id:string) => {
  const Header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Token'),
    org: localStorage.getItem('org')
  }
  return await fetchData(`${ChatMessageHistory}/${wa_id}/`, 'GET', null as any, Header);
}

export const getLeadDetails = async (lead_id:string) => {
  const Header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Token'),
    org: localStorage.getItem('org')
  }
  return await fetchData(`${LeadUrl}/${lead_id}/`, 'GET', null as any, Header);
}
export const inbox: Inbox[] = [];