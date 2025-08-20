// Date-fns configuration for pt-BR locale
import { ptBR } from 'date-fns/locale';

// Export locale for use in date-fns functions
export const dateLocale = ptBR;

// Common date formats
export const dateFormats = {
    display: 'dd/MM/yyyy',
    api: 'yyyy-MM-dd',
    datetime: 'dd/MM/yyyy HH:mm',
    time: 'HH:mm'
};

// Utility functions
export const formatDate = (date, format = dateFormats.display) => {
    const { format: formatFn } = require('date-fns');
    return formatFn(date, format, { locale: dateLocale });
};

export const parseDate = (dateString, format = dateFormats.display) => {
    const { parse } = require('date-fns');
    return parse(dateString, format, new Date(), { locale: dateLocale });
};
