import { Padding, RadioButtonUnchecked } from "@mui/icons-material"
import DriveIcon from '@mui/icons-material/DriveEta';
export const Links=({project})=>{
  debugger
  
    return(<>
    
<svg style={{ marginLeft:"12px" }}width="21" height="21"  onClick={()=>  window.open(`${project.urlFigma}`)} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5247 10.5C10.5247 8.567 12.0917 7 14.0246 7C15.9576 7 17.5246 8.56704 17.5246 10.5C17.5246 12.433 15.9576 14 14.0246 14C12.0916 14 10.5247 12.433 10.5247 10.5Z" fill="#00BCFF"/>
<path d="M3.52466 17.4999C3.52466 15.5669 5.09166 13.9999 7.02464 13.9999L8.88983 13.0151L10.5246 13.9999V17.4999C10.5246 19.4329 8.95763 20.9999 7.02464 20.9999C5.09166 20.9999 3.52466 19.4329 3.52466 17.4999Z" fill="#00CF7F"/>
<path d="M10.5246 0L8.62012 3.30873L10.5246 6.99997H13.9755C15.9086 6.99997 17.4755 5.43297 17.4755 3.49999C17.4755 1.567 15.9085 0 13.9755 0H10.5246Z" fill="#FF7361"/>
<path d="M3.47546 3.49999C3.47546 5.43297 5.04247 6.99997 6.97545 6.99997L8.83211 7.71709L10.5245 6.99997V0H6.97541C5.04247 0 3.47546 1.567 3.47546 3.49999Z" fill="#FF4D12"/>
<path d="M3.52466 10.5C3.52466 12.4331 5.09166 14 7.02464 14H10.5246V7H7.02464C5.09166 7 3.52466 8.56704 3.52466 10.5Z" fill="#B659FF"/>
</svg>
 

<svg style={{ marginLeft:"12px"}} width="22" height="22" onClick={()=>  window.open(`${project.urlWordpress}`)} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_34_1474)">
<path d="M6.5994 6.78941H5.38449L8.69667 16.1522L10.5509 10.8533L9.1133 6.78941H7.83146V5.89727H13.5079V6.78941H12.1786L15.4907 16.1522L16.6813 12.7498C18.2431 8.39073 15.4012 7.03286 15.4012 6.06003C15.4012 5.0872 16.1899 4.2986 17.1627 4.2986C17.2153 4.2986 17.2664 4.30145 17.3165 4.30612C15.6682 2.75011 13.4456 1.7959 10.9999 1.7959C7.80433 1.7959 4.98948 3.42479 3.33936 5.89727H6.5993V6.78941H6.5994Z" fill="#00769D"/>
<path d="M1.79602 11.0002C1.79602 14.524 3.77658 17.5847 6.6849 19.1313L2.53135 7.39014C2.0582 8.4986 1.79602 9.71877 1.79602 11.0002Z" fill="#00769D"/>
<path d="M19.01 6.46484C19.1417 7.24002 19.1018 8.11128 18.8998 8.98592H18.9364L18.7973 9.38359C18.7148 9.67073 18.611 9.96446 18.493 10.2531L15.326 19.1254C18.2283 17.5769 20.2038 14.5195 20.2038 11.0002C20.2038 9.3511 19.7696 7.80355 19.01 6.46484Z" fill="#00769D"/>
<path d="M8.16138 19.7573C9.05553 20.0469 10.0093 20.204 11 20.204C11.9449 20.204 12.8564 20.0614 13.7146 19.7969L11.0223 12.1865L8.16138 19.7573Z" fill="#00769D"/>
<path d="M18.7781 3.22181C16.7005 1.14419 13.9382 0 11 0C8.06175 0 5.29942 1.14419 3.22181 3.22181C1.14419 5.29942 0 8.06175 0 11C0 13.9382 1.14419 16.7005 3.22181 18.7781C5.29942 20.8558 8.0618 22 11 22C13.9382 22 16.7005 20.8558 18.7782 18.7781C20.8558 16.7005 22 13.9382 22 11C22 8.06175 20.8558 5.29942 18.7781 3.22181ZM11 21.224C5.36242 21.224 0.775966 16.6375 0.775966 11C0.775966 5.36247 5.36242 0.775966 11 0.775966C16.6375 0.775966 21.2239 5.36247 21.2239 11C21.2239 16.6375 16.6375 21.224 11 21.224Z" fill="#00769D"/>
</g>
<defs>
<clipPath id="clip0_34_1474">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
</svg>


<svg width="20" height="20"onClick={()=>  window.open(`${project.urlDrive}`)} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_34_1495)">
<path d="M1.50637 16.2778L2.38567 17.8029C2.56836 18.1239 2.83137 18.3764 3.14032 18.5602L6.29438 16.3239L6.30012 13.1134L3.15258 11.6953L3.19829e-06 13.1021C-0.000621802 13.4572 0.0903548 13.8125 0.273089 14.1335L1.50637 16.2778Z" fill="#0066DD"/>
<path d="M10.0114 6.78914L10.176 2.60695L6.87113 1.33105C6.56152 1.51379 6.29762 1.76531 6.11375 2.0857L0.276758 12.1555C0.0929297 12.4759 0.000625 12.8308 0 13.1859L6.30012 13.1971L10.0114 6.78914Z" fill="#00AD3C"/>
<path d="M10.0114 6.78928L13.0389 5.16061L13.1712 1.34244C12.8623 1.15862 12.5073 1.06635 12.1408 1.06569L7.90254 1.05811C7.53598 1.05744 7.1807 1.15991 6.87109 1.33119L10.0114 6.78928Z" fill="#00831E"/>
<path d="M13.6999 13.1265L6.30015 13.1133L3.14038 18.5601C3.44933 18.7439 3.80429 18.8362 4.17081 18.8368L15.8088 18.8576C16.1754 18.8583 16.5307 18.7558 16.8403 18.5845L16.8525 14.9259L13.6999 13.1265Z" fill="#0084FF"/>
<path d="M16.8403 18.5845C17.1499 18.4018 17.4138 18.1503 17.5976 17.8299L17.9653 17.2005L19.7233 14.1682C19.9071 13.8478 19.9994 13.4929 20.0001 13.1377L16.3586 11.2217L13.7114 13.1265L16.8403 18.5845Z" fill="#FF4131"/>
<path d="M16.8265 7.14498L13.926 2.09967C13.7433 1.77857 13.4803 1.52611 13.1713 1.34229L10.0115 6.78912L13.6999 13.2104L19.9885 13.2217C19.9892 12.8666 19.8982 12.5113 19.7155 12.1902L16.8265 7.14498Z" fill="#FFBA00"/>
</g>
<defs>
<clipPath id="clip0_34_1495">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg> 

    </>)
}
export default Links;