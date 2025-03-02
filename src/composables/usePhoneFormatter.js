

export function usePhoneFormatter(objRef) {
  const formatPhoneNumber = () => {
    let cleaned = objRef.value.replace(/\D/g, '')
    if (cleaned.length > 12) cleaned = cleaned.substring(0, 12)
    if (cleaned.length >= 7) {
      objRef.value = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 12)}`
    } else if (cleaned.length >= 4) {
      objRef.value = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}`
    } else if (cleaned.length >= 1) {
      objRef.value = `(${cleaned}`
    }
  }

  return {
    formatPhoneNumber
  }
}