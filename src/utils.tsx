import { R4 } from "@ahryman40k/ts-fhir-types";

export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) {
      return 'Invalid date'; 
    }
    const date = new Date(dateString); 
    return date.toLocaleString('en-GB', {
      year: 'numeric', 
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',','')
  };