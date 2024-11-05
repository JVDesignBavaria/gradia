const buildVersion = 'Version 1.0'

let subjects = [];

let settings = {
    lang: undefined,
    examName: 'Schulaufgaben',
    showMultiplier: false,
    darkmode: true,
    activeSession: undefined,
    seenDownloadMessage: false,
    offline: false,
    seenStoragePolicy: false
}

const supportedLanguages = [
    'de',
    'en'
]

const broadcastID = [];

const iconPaths = {
    "logo": `<path style="fill:#957b9e;fill-opacity:1;stroke-width:4.50001;paint-order:fill markers stroke" d="M 11.958917,0.04026482 A 12,12 0 0 0 0.040782,10.665456 h 2.778642 a 9.25,9.25 0 0 1 9.139493,-7.8749715 9.25,9.25 0 0 1 1.37511,0.1085205 V 0.12243035 a 12,12 0 0 0 -1.37511,-0.08216553 z m 1.37511,10.62519118 v 2.749703 h 7.772136 a 9.25,9.25 0 0 1 -7.772136,7.766451 v 2.778125 A 12,12 0 0 0 23.959218,12.040049 12,12 0 0 0 23.877053,10.665456 H 21.105646 Z M 0.041299,13.415159 A 12,12 0 0 0 10.584324,23.959735 V 13.415159 Z" />`,
    "home-icon": `<path d="M10.5495 2.53189C11.3874 1.82531 12.6126 1.82531 13.4505 2.5319L20.2005 8.224C20.7074 8.65152 21 9.2809 21 9.94406V19.7468C21 20.7133 20.2165 21.4968 19.25 21.4968H15.75C14.7835 21.4968 14 20.7133 14 19.7468V14.2468C14 14.1088 13.8881 13.9968 13.75 13.9968H10.25C10.1119 13.9968 9.99999 14.1088 9.99999 14.2468V19.7468C9.99999 20.7133 9.2165 21.4968 8.25 21.4968H4.75C3.7835 21.4968 3 20.7133 3 19.7468V9.94406C3 9.2809 3.29255 8.65152 3.79952 8.224L10.5495 2.53189ZM12.4835 3.6786C12.2042 3.44307 11.7958 3.44307 11.5165 3.6786L4.76651 9.37071C4.59752 9.51321 4.5 9.72301 4.5 9.94406V19.7468C4.5 19.8849 4.61193 19.9968 4.75 19.9968H8.25C8.38807 19.9968 8.49999 19.8849 8.49999 19.7468V14.2468C8.49999 13.2803 9.2835 12.4968 10.25 12.4968H13.75C14.7165 12.4968 15.5 13.2803 15.5 14.2468V19.7468C15.5 19.8849 15.6119 19.9968 15.75 19.9968H19.25C19.3881 19.9968 19.5 19.8849 19.5 19.7468V9.94406C19.5 9.72301 19.4025 9.51321 19.2335 9.37071L12.4835 3.6786Z" fill="#fff"/>`,
    "plus-icon": "M 22.285715,10.285714 H 13.714286 V 1.7142857 C 13.714286,0.76799995 12.946286,-4.9999999e-8 12,-4.9999999e-8 11.053714,-4.9999999e-8 10.285714,0.76799995 10.285714,1.7142857 V 10.285714 H 1.7142859 C 0.76800025,10.285714 2.5e-7,11.053714 2.5e-7,12 c 0,0.946285 0.768,1.714285 1.71428565,1.714285 h 8.5714281 v 8.571429 C 10.285714,23.232 11.053714,24 12,24 c 0.946286,0 1.714286,-0.768 1.714286,-1.714286 v -8.571429 h 8.571429 C 23.232,13.714285 24,12.946285 24,12 24,11.053714 23.232,10.285714 22.285715,10.285714 Z",
    "tick-icon": "m 24,5.1428548 c 0,0.43864 -0.16741,0.8775 -0.50223,1.21179 L 9.78348,20.068925 c -0.33348,0.33643 -0.7727701,0.5025 -1.2120501,0.5025 -0.43929,0 -0.8775,-0.16741 -1.21179,-0.50223 L 0.50249995,13.212055 C 0.16767996,12.878575 -4.4999999e-8,12.439285 -4.4999999e-8,11.999995 c 0,-0.97928 0.800889994999999,-1.71428 1.714289944999999,-1.71428 0.43864,0 0.8775,0.16741 1.21178,0.50223 l 5.64536,5.64777 L 21.075,3.9321448 c 0.33214,-0.3359 0.77143,-0.50357 1.21072,-0.50357 0.91607,0 1.71428,0.73392 1.71428,1.71428 z",
    "settings-icon": `<path d="m 12.294843,9.0145326 a 3,3 0 1 0 2.690625,2.6906254 3.0060937,3.0060937 0 0 0 -2.690625,-2.6906254 z m 7.223438,2.9854684 a 7.2346875,7.2346875 0 0 1 -0.07172,0.974532 l 2.119219,1.662187 a 0.50671875,0.50671875 0 0 1 0.114844,0.644531 l -2.004844,3.46875 a 0.50671875,0.50671875 0 0 1 -0.615938,0.215156 l -2.104687,-0.8475 a 0.75515625,0.75515625 0 0 0 -0.711094,0.08203 7.71,7.71 0 0 1 -1.009687,0.587812 0.7471875,0.7471875 0 0 0 -0.413438,0.569063 l -0.315469,2.244843 a 0.519375,0.519375 0 0 1 -0.500625,0.429844 H 9.9951566 A 0.52078125,0.52078125 0 0 1 9.4940628,21.61547 l -0.315,-2.241563 A 0.75328125,0.75328125 0 0 0 8.7571878,18.801095 7.2796875,7.2796875 0 0 1 7.7512503,18.211876 0.75,0.75 0 0 0 7.042969,18.13172 L 4.9387503,18.978751 A 0.50671875,0.50671875 0 0 1 4.3228128,18.764064 L 2.317969,15.295314 a 0.50625,0.50625 0 0 1 0.1148438,-0.644532 l 1.7910937,-1.406249 a 0.75234375,0.75234375 0 0 0 0.28125,-0.66 c -0.016875,-0.195469 -0.027188,-0.390469 -0.027188,-0.585938 0,-0.195469 0.00984,-0.387656 0.027188,-0.578906 A 0.75,0.75 0 0 0 4.2206253,10.766251 L 2.430469,9.3600013 A 0.50671875,0.50671875 0 0 1 2.3193753,8.7187513 L 4.324219,5.2500013 A 0.50671875,0.50671875 0 0 1 4.9401565,5.034845 l 2.1046875,0.8475 A 0.75515625,0.75515625 0 0 0 7.7559378,5.8003138 7.71,7.71 0 0 1 8.7656253,5.2125013 0.7471875,0.7471875 0 0 0 9.1790628,4.6434388 L 9.4945315,2.398595 A 0.519375,0.519375 0 0 1 9.9951566,1.9687513 h 4.0096864 a 0.52078125,0.52078125 0 0 1 0.501094,0.4157812 l 0.315,2.2415625 a 0.75328125,0.75328125 0 0 0 0.421875,0.5728126 7.2796875,7.2796875 0 0 1 1.005938,0.5892187 0.75,0.75 0 0 0 0.708281,0.080156 L 19.06125,5.0212511 a 0.50671875,0.50671875 0 0 1 0.615937,0.2146875 l 2.004844,3.46875 A 0.50625,0.50625 0 0 1 21.567187,9.3492198 L 19.776093,10.75547 a 0.75234375,0.75234375 0 0 0 -0.283593,0.66 c 0.01547,0.194063 0.02578,0.389063 0.02578,0.584531 z" style="fill:none;stroke:#fff;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:round" id="path4-5" />`,
    "options-icon-custom": "M 12,0 A 12,11.999975 0 0 0 0,11.999975 12,11.999975 0 0 0 12,23.99995 12,11.999975 0 0 0 24,11.999975 12,11.999975 0 0 0 12,0 Z m 0,1.7499964 A 10.25,10.249979 0 0 1 22.25,11.999975 10.25,10.249979 0 0 1 12,22.249954 10.25,10.249979 0 0 1 1.75,11.999975 10.25,10.249979 0 0 1 12,1.7499964 Z M 5.6060547,10.400076 a 1.6000001,1.5999968 0 0 0 -1.6,1.599997 1.6000001,1.5999968 0 0 0 1.6,1.599997 1.6000001,1.5999968 0 0 0 1.5999999,-1.599997 1.6000001,1.5999968 0 0 0 -1.5999999,-1.599997 z m 6.3940433,0 a 1.6000001,1.5999968 0 0 0 -1.600001,1.599997 1.6000001,1.5999968 0 0 0 1.600001,1.599997 1.6000001,1.5999968 0 0 0 1.6,-1.599997 1.6000001,1.5999968 0 0 0 -1.6,-1.599997 z m 6.394141,0 a 1.6000001,1.5999968 0 0 0 -1.600001,1.599997 1.6000001,1.5999968 0 0 0 1.600001,1.599997 1.6000001,1.5999968 0 0 0 1.599998,-1.599997 1.6000001,1.5999968 0 0 0 -1.599998,-1.599997 z",
    "options-icon": "m 20.831566,2.5968607 0.571568,0.571569 c 0.444034,0.4440299 0.444034,1.1620334 0,1.6013395 l -1.3746,1.3793224 -2.177631,-2.1776313 1.374601,-1.3746006 c 0.444028,-0.44403 1.162033,-0.44403 1.601339,0 z M 9.9103459,11.916745 16.249566,5.5727994 18.427197,7.7504307 12.083253,14.089653 c -0.13698,0.13698 -0.307041,0.236184 -0.491267,0.288145 l -2.7633706,0.78886 0.7888598,-2.763372 C 9.6694292,12.219067 9.7686443,12.049009 9.9056226,11.91202 Z M 17.624166,0.99552227 8.3042841,10.310683 c -0.4109625,0.410962 -0.7085577,0.916401 -0.864438,1.469074 l -1.3509808,4.723712 c -0.1133609,0.396791 -0.00472,0.821926 0.2881474,1.114797 0.2928692,0.292869 0.7180034,0.401515 1.1147963,0.288148 l 4.723711,-1.350982 c 0.557397,-0.1606 1.062836,-0.458199 1.469074,-0.86444 l 9.319882,-9.3151615 c 1.327365,-1.3273638 1.327365,-3.4813758 0,-4.8087391 L 22.432913,0.99552227 c -1.327363,-1.3273631 -3.481375,-1.3273631 -4.808747,0 z M 4.1568657,2.83777 C 1.8611421,2.83777 0,4.6989127 0,6.9946367 V 19.843134 C 0,22.138859 1.8611421,24 4.1568657,24 H 17.00536 c 2.295723,0 4.156866,-1.861141 4.156866,-4.156866 v -5.290558 c 0,-0.628253 -0.505437,-1.13369 -1.13369,-1.13369 -0.628254,0 -1.13369,0.505437 -1.13369,1.13369 v 5.290558 c 0,1.04394 -0.845545,1.889485 -1.889484,1.889485 H 4.1568657 c -1.0439399,0 -1.8894844,-0.845543 -1.8894844,-1.889485 V 6.9946367 c 0,-1.0439401 0.8455445,-1.8894848 1.8894844,-1.8894848 h 5.2905564 c 0.6282539,0 1.1336899,-0.5054365 1.1336899,-1.1336901 0,-0.6282537 -0.505436,-1.1336901 -1.1336899,-1.1336901 zM441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z",
    "edit-icon": `<path clip-rule="evenodd" d="m 23.455093,7.9496114 c 0.725815,-0.716566 0.726646,-1.8796607 0.0019,-2.5972235 L 18.594542,0.53820282 c -0.724061,-0.7168962 -1.898399,-0.717703 -2.623476,-0.0018 L 2.355818,13.979258 C 1.991572,14.338889 1.7352151,14.79138 1.6152429,15.286427 l -1.56238989,6.447504 c -0.3322328,1.371045 0.95675949,2.585537 2.32467569,2.190367 l 6.2414182,-1.803137 c 0.4478769,-0.129415 0.8556918,-0.368123 1.1859686,-0.694245 z m -5.488151,2.8250016 -9.4728875,9.352795 c -0.1100306,0.108739 -0.246,0.188308 -0.395298,0.231416 L 2.9268792,21.853008 C 2.4502856,21.990638 2.002732,21.562146 2.1195657,21.080023 l 1.3002086,-5.365566 c 0.039997,-0.164954 0.1254461,-0.315785 0.2468583,-0.435692 L 13.103068,5.9618307 Z M 19.280388,9.4777834 14.416606,4.6649729 16.632451,2.4771341 c 0.359907,-0.3553014 0.938676,-0.3549045 1.29803,9.086e-4 l 3.550429,3.5151858 c 0.365169,0.361569 0.364707,0.9517656 -9.43e-4,1.3128177 z" fill-rule="evenodd"/>`,
    "delete-icon": "M 9.4921875,2.41875 8.6015625,3.75 H 15.398438 L 14.507813,2.41875 C 14.4375,2.315625 14.320313,2.25 14.19375,2.25 H 9.8015625 C 9.675,2.25 9.5578125,2.3109375 9.4875,2.41875 Z M 16.382813,1.171875 18.103125,3.75 H 18.75 21 21.375 C 21.998438,3.75 22.5,4.2515625 22.5,4.875 22.5,5.4984375 21.998438,6 21.375,6 H 21 V 20.25 C 21,22.321875 19.321875,24 17.25,24 H 6.75 C 4.678125,24 3,22.321875 3,20.25 V 6 H 2.625 C 2.0015625,6 1.5,5.4984375 1.5,4.875 1.5,4.2515625 2.0015625,3.75 2.625,3.75 H 3 5.25 5.896875 L 7.6171875,1.1671875 C 8.1046875,0.440625 8.925,0 9.8015625,0 H 14.19375 c 0.876563,0 1.696875,0.440625 2.184375,1.1671875 z M 5.25,6 v 14.25 c 0,0.829687 0.6703125,1.5 1.5,1.5 h 10.5 c 0.829687,0 1.5,-0.670313 1.5,-1.5 V 6 Z M 9,9 v 9.75 C 9,19.1625 8.6625,19.5 8.25,19.5 7.8375,19.5 7.5,19.1625 7.5,18.75 V 9 C 7.5,8.5875 7.8375,8.25 8.25,8.25 8.6625,8.25 9,8.5875 9,9 Z m 3.75,0 v 9.75 c 0,0.4125 -0.3375,0.75 -0.75,0.75 -0.4125,0 -0.75,-0.3375 -0.75,-0.75 V 9 c 0,-0.4125 0.3375,-0.75 0.75,-0.75 0.4125,0 0.75,0.3375 0.75,0.75 z m 3.75,0 v 9.75 c 0,0.4125 -0.3375,0.75 -0.75,0.75 C 15.3375,19.5 15,19.1625 15,18.75 V 9 c 0,-0.4125 0.3375,-0.75 0.75,-0.75 0.4125,0 0.75,0.3375 0.75,0.75 z",
    "close-icon": `<path d="m 21.4125,5.4125 c 0.78125,-0.78125 0.78125,-2.05 0,-2.83125 C 20.63125,1.8 19.3625,1.8 18.58125,2.58125 L 12,9.16875 5.4125,2.5875 C 4.63125,1.80625 3.3625,1.80625 2.58125,2.5875 1.8,3.36875 1.8,4.6375 2.58125,5.41875 L 9.16875,12 2.5875,18.5875 c -0.78125,0.78125 -0.78125,2.05 0,2.83125 0.78125,0.78125 2.05,0.78125 2.83125,0 L 12,14.83125 18.5875,21.4125 c 0.78125,0.78125 2.05,0.78125 2.83125,0 0.78125,-0.78125 0.78125,-2.05 0,-2.83125 L 14.83125,12 Z" style="stroke-width:0.0625" />`,
    "ios-share-icon": "m 11.55943,0.43947875 c -0.58597,-0.58597 -1.53758,-0.58597 -2.12355,0 L 3.43559,6.4397688 c -0.58597,0.58597 -0.58597,1.53758 0,2.12354 0.58597,0.58597 1.53758,0.58597 2.12354,0 l 3.4408,-3.44079 v 9.8770402 c 0,0.82973 0.67034,1.50008 1.50007,1.50008 0.82973,0 1.50007,-0.67035 1.50007,-1.50008 V 5.1225188 l 3.44079,3.44079 c 0.58597,0.58597 1.53758,0.58597 2.12355,0 0.58596,-0.58596 0.58596,-1.53757 0,-2.12354 L 11.56411,0.43947875 Z M 2.99963,16.499639 c 0,-0.82973 -0.67034,-1.50008 -1.50007,-1.50008 -0.82973,0 -1.50007,0.67035 -1.50007,1.50008 v 3.00014 c 0,2.4845 2.01572,4.50022 4.50022,4.50022 h 12.00058 c 2.4845,0 4.50022,-2.01572 4.50022,-4.50022 v -3.00014 c 0,-0.82973 -0.67034,-1.50008 -1.50007,-1.50008 -0.82973,0 -1.50008,0.67035 -1.50008,1.50008 v 3.00014 c 0,0.82973 -0.67034,1.50008 -1.50007,1.50008 H 4.49971 c -0.82973,0 -1.50008,-0.67035 -1.50008,-1.50008 z",
}

let scene;
let activeSession;
let editing = false;

function replaceIcons() {
    // Select all <i> tags
    const icons = document.querySelectorAll('i');
  
    // Iterate over each <i> tag
    icons.forEach(icon => {
        // Find the matching class in the iconPaths object
        const matchedClass = Object.keys(iconPaths).find(cls => icon.classList.contains(cls));
        
        if (matchedClass) {
            // Get the corresponding SVG path
            const pathData = iconPaths[matchedClass];
            
            // Get the color and size from the <i> tag's styles
            const color = icon.dataset.color || icon.style.color || 'currentColor'; // Default to 'currentColor' if not specified
            const size = icon.dataset.size || window.getComputedStyle(icon).fontSize || '16px'; // Default size if not specified
            
            // Create the SVG element
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("fill", color);
            svg.setAttribute("width", size);
            svg.setAttribute("height", size);
            svg.setAttribute("aria-hidden", "true");
            
            if(pathData.includes('<')) {
                icon.innerHTML = '';
                icon.appendChild(svg);
                svg.innerHTML = pathData;
                return;
            }

            // Create the path element
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathData);
            
            // Append the path to the SVG
            svg.appendChild(path);
            
            // Replace the <i> tag's content with the SVG
            icon.innerHTML = '';
            icon.appendChild(svg);
        }
    });
} 

function addSubject(name) {
    subjects.find(element => element.name === activeSession).grades.push({name, grades: []});
}

function addSession(name) {
    const cleared = deleteSpaces(name);
    if(!cleared || subjects.find(element => element.name === cleared)) {
        showMessage(text({de:`Dieser Name ist nicht gültig`, en:`This name isn't valid`}));
        return false;
    }
    subjects.push({ name: cleared, grades: [] })
    activeSession = cleared;
    settings.activeSession = activeSession;
    setLocalStorage(settings, 'settings');
    document.getElementById('sessionLink').textContent = '< ' + cleared;
    loadSession();
    return true;
}

function addGrade(subjectName, grade, weight, description) {
    if(activeSession == undefined) {
        let newSession = prompt(text({de:`Geben Sie einen Namen für das Schuljahr ein, für das die Note eingetragen werden soll`, en:`Enter a name for the school year this grade belongs to`}));
        addSession(newSession);
    }

    let subject = subjects.find(element => element.name === activeSession).grades.find(subject => subject.name === subjectName);

    if (subject) {
        if (document.getElementById('schulaufgabe').checked) {
            let location = searchArray(subject.grades);

            if (location == undefined) {
                subject.grades.unshift([ { grade, weight, description }]);
                subject.examWeight = parseFloat(prompt(text({de:`Wie stark werden ${settings.examName} im Gesamtschnitt gewertet? (1/2)`, en:`How heavily are ${settings.examName} rated in the overall grade? (1/2)`})));
                return;
            }
            subject.grades[location].push({ grade, weight, description });
            return;
        }

        subject.grades.push({ grade, weight, description });
    } 
    else {
        addSubject(subjectName);
        addGrade(subjectName, grade, weight, description);
    }
}

function searchArray(array) {
    for(i = 0; i < array.length; i ++) {
        if(Array.isArray(array[i])) return i;
    }
    return;
}

function loadSubjects() {
    if(!(subjects.find(element => element.name === activeSession).grades.length > 0)) {
        emptyTable(document.getElementById('table'));
        let newTR = document.createElement('tr');
        newTR.id = 'emptyTable';
        document.getElementById('table').appendChild(newTR);

        let newTH = document.createElement('th');
        newTH.textContent = text({de:`Keine Noten eingetragen`, en:`No grades added`});
        document.getElementById('emptyTable').appendChild(newTH);
        return;
    }
    emptyTable(document.getElementById('table'));
        let avg = [];
        subjects.find(element => element.name === activeSession).grades.forEach(subject => {
            let newTR = document.createElement('tr');
            newTR.dataset.session = activeSession;
            newTR.dataset.name = subject.name;
            newTR.id = activeSession + subject.name;
            newTR.className = 'subjTR';
            document.getElementById('table').appendChild(newTR);


            let newSubjDiv = document.createElement('div');

            let toolDiv = document.createElement('div');
            toolDiv.classList = `transparent`;

            let editBtn = document.createElement('i');
            editBtn.classList = `edit-icon editIcon`;
            toolDiv.appendChild(editBtn);

            let removeBtn = document.createElement('i');
            removeBtn.classList = `delete-icon removeIcon`;
            toolDiv.appendChild(removeBtn);

            let newSubj = document.createElement('th');
            newSubj.textContent = subject.name;
            newSubjDiv.appendChild(toolDiv);
            newSubjDiv.appendChild(newSubj);
            document.getElementById(activeSession + subject.name).appendChild(newSubjDiv);

            let calcAvg = calculateAvg(subject.grades, subject.examWeight);
            if(parseFloat(calcAvg)) {
                let newAvg = document.createElement('td');
                newAvg.textContent = calcAvg;
                avg.push(parseFloat(calcAvg));
                document.getElementById(activeSession + subject.name).appendChild(newAvg);
            }

            let count = -1;
            subject.grades.forEach(gradesArray => {
                count ++;
                let newTr = document.createElement('tr');
                newTr.dataset.session = activeSession;
                newTr.dataset.name = subject.name;
                newTr.dataset.count = count;
                newTr.id = activeSession + subject.name + count;
                newTr.classList = activeSession + subject.name + ' hiddenTr';
                document.getElementById('table').appendChild(newTr);

                if (Array.isArray(gradesArray)) {
                    let newTd = document.createElement('td');
                    newTd.textContent = settings.examName;
                    document.getElementById(activeSession + subject.name + count).appendChild(newTd);

                    newTd = document.createElement('td');
                    newTd.textContent = calculateAvg(gradesArray, 1);
                    document.getElementById(activeSession + subject.name + count).appendChild(newTd);

                    let count2 = -1;
                    gradesArray.forEach(element => {
                        count2 ++;
                        let newTr = document.createElement('tr');
                        newTr.dataset.session = activeSession;
                        newTr.dataset.name = subject.name;
                        newTr.dataset.count = count;
                        newTr.dataset.innerCount = count2;
                        newTr.id = activeSession + subject.name + count + count2;
                        newTr.classList = activeSession + subject.name + ' ' + activeSession + subject.name + count + ' hiddenTr' + ' inExam';
                        document.getElementById('table').appendChild(newTr);

                        let newGrdDiv = document.createElement('div');

                        let toolDiv = document.createElement('div');
                        toolDiv.classList = `transparent`;

                        let editBtn = document.createElement('i');
                        editBtn.classList = `edit-icon editIcon`;
                        toolDiv.appendChild(editBtn);

                        let removeBtn = document.createElement('i');
                        removeBtn.classList = `delete-icon removeIcon`;
                        toolDiv.appendChild(removeBtn);

                        let newGrd = document.createElement('td');
                        newGrd.textContent = element.description;
                        newGrdDiv.appendChild(toolDiv);
                        newGrdDiv.appendChild(newGrd);
                        document.getElementById(activeSession + subject.name + count + count2).appendChild(newGrdDiv);

                        let gradeDiv = document.createElement('div');
                        gradeDiv.classList = 'gradeDiv';

                        newGrd = document.createElement('td');
                        newGrd.textContent = element.grade;
                        gradeDiv.appendChild(newGrd);

                        if(settings.showMultiplier) {
                            newGrd = document.createElement('td');
                            newGrd.textContent = element.weight + 'x';
                            gradeDiv.appendChild(newGrd);
                        }

                        document.getElementById(activeSession + subject.name + count + count2).appendChild(gradeDiv);
                    });
                }
                else {
                    let newGrdDiv = document.createElement('div');

                    let toolDiv = document.createElement('div');
                    toolDiv.classList = `transparent`;

                    let editBtn = document.createElement('i');
                    editBtn.classList = `edit-icon editIcon`;
                    toolDiv.appendChild(editBtn);

                    let removeBtn = document.createElement('i');
                    removeBtn.classList = `delete-icon removeIcon`;
                    toolDiv.appendChild(removeBtn);

                    let newGrd = document.createElement('td');
                    newGrd.textContent = gradesArray.description;
                    newGrdDiv.appendChild(toolDiv);
                    newGrdDiv.appendChild(newGrd);
                    document.getElementById(activeSession + subject.name + count).appendChild(newGrdDiv);

                    let gradeDiv = document.createElement('div');
                    gradeDiv.classList = 'gradeDiv';

                    newGrd = document.createElement('td');
                    newGrd.textContent = gradesArray.grade;
                    gradeDiv.appendChild(newGrd);

                    if(settings.showMultiplier) {
                        newGrd = document.createElement('td');
                        newGrd.textContent = gradesArray.weight + 'x';
                        gradeDiv.appendChild(newGrd);
                    }

                    document.getElementById(activeSession + subject.name + count).appendChild(gradeDiv);
                }
            });
        });

        let newTR = document.createElement('tr');
        newTR.id = 'total';
        newTR.className = 'subjTR';
        document.getElementById('table').appendChild(newTR);

        let newSubj = document.createElement('th');
        newSubj.textContent = text({de:`Gesamt`, en:`Total`});
        document.getElementById('total').appendChild(newSubj);

        let calcAvg = calculateAvgFromArray(avg);
        if(parseFloat(calcAvg)) {
            let newAvg = document.createElement('td');
            let calcAvg = calculateAvgFromArray(avg);
            newAvg.textContent = calcAvg;
            document.getElementById('total').appendChild(newAvg);
        }
    replaceIcons();
}

/*function loadSubjects() {
    emptyTable(document.getElementById('table'));
        subjects.forEach(subject => {
            console.log(activeSession + subject.name);
            
            let newTR = document.createElement('tr');
            newTR.id = activeSession + subject.name;
            document.getElementById('table').appendChild(newTR);

            let newSubj = document.createElement('th');
            newSubj.textContent = activeSession + subject.name;
            document.getElementById(activeSession + subject.name).appendChild(newSubj);

            subject.grades.forEach(gradesArray => {
                console.log(gradesArray.grade);

                let newGrd = document.createElement('td');
                newGrd.textContent = gradesArray.grade;
                document.getElementById(activeSession + subject.name).appendChild(newGrd);
            });
            console.log(calculateAvg(subject.grades));

            let newAvg = document.createElement('td');
            newAvg.textContent = calculateAvg(subject.grades);
            document.getElementById(activeSession + subject.name).appendChild(newAvg);
        });
}*/

function emptyTable(el) {
    el.innerHTML = "";
}

function toggleAll(elements) {
    if (elements[0].style.display == 'none') {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'flex';
        }
    }
    else {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }
}

function calculateAvg(array, examWeight) {
    let counter = 0;
    let sum = 0;
    let avg = 0;
    let smallAvg;
    let smallAvgCounter = 1;

    array.forEach(gradeObj => {
        if(Array.isArray(gradeObj) && gradeObj.length > 0) {
            avg = calculateAvg(gradeObj);
        }
        else {
            sum = sum + gradeObj.grade * gradeObj.weight;
            counter = counter + gradeObj.weight;
        }
    })

    if(counter == 0) {
        smallAvg = 0;
        smallAvgCounter = 0;
    }
    else smallAvg = sum/counter;

    if(avg == 0) return (smallAvg.toFixed(3)).slice(0,4); //return correctly formatted grade
    return ((smallAvg + examWeight * avg)/(smallAvgCounter + examWeight)).toFixed(3).slice(0,4); //return correctly formatted grade with exams
}

function calculateAvgFromArray(array) {
    let counter = 0;
    let sum = 0;
    array.forEach(element => {
        sum = sum + element;
        counter = counter + 1;
    })
    return ((sum/counter).toFixed(3)).slice(0,4);
}

function save() {
    if(!(document.getElementById('settings').style.display == 'none')) { //only save settings and don't reload whole UI
        saveSettings();
        return;
    }
    let addVar;
    if(document.getElementById('addVar').textContent) addVar = JSON.parse(document.getElementById('addVar').textContent);
    let name;
    let dir;
    if(!(scene == 'editSession') && !(scene == 'addSession') || scene == 'sessions') dir = subjects.find(session => session.name === activeSession).grades;
    switch (scene) {
        case 'addGrade':
            if (document.getElementById('focusedSubj').value == '' || document.getElementById('grade').value == '' || document.getElementById('weight').value == '') {
                showMessage(text({de:`Die Felder müssen ausgefüllt sein`, en:`You need to fill in the inputs`}));
                return;
            }
            /*if (/\d/.test(document.getElementById('focusedSubj').value)) {
                showMessage(text({de:`Die Fächer-Bezeichnung darf keine Zahl enthalten`, en:`The subject name must not contain  any number`}));
                return;
            }
            if(document.getElementById('focusedSubj').value.includes(activeSession)) {
                showMessage(text({de:`Die Fächer-Bezeichnung kann nicht das Schuljahr enthalten`, en:`The subject can't contain the name of the year`}));
                return;
            }*/
            addGrade(deleteSpaces(document.getElementById('focusedSubj').value),parseFloat(document.getElementById('grade').value),parseFloat(document.getElementById('weight').value), deleteSpaces(document.getElementById('description').value));
            break;
        case 'addSubject':
            addSubject(document.getElementById('focusedSubj').value);
            break;
        case 'addSession':
            let newSessName = document.getElementById('addSess').value;
            if(addSession(newSessName)) {
                activeSession = deleteSpaces(newSessName);
                settings.activeSession = activeSession;
                setLocalStorage(settings, 'settings');
            }
            break;
        case 'editGrade':
            let newGrade = {
                grade: 1,
                weight: 1,
                description: ''
            };
            newGrade.grade = parseFloat(document.getElementById('grade').value);
            newGrade.weight = parseFloat(document.getElementById('weight').value);
            newGrade.description = document.getElementById('description').value;
            subjects.find(element => element.name === activeSession).grades.find(element => element.name === addVar[0]).grades[addVar[1]] = newGrade;

            if(addVar[2]) { //2 indices means Schulaufgabe
                subjects.find(element => element.name === activeSession).grades.find(element => element.name === addVar[0]).grades[addVar[1]][addVar[2]] = newGrade;
            }
            else {
                subjects.find(element => element.name === activeSession).grades.find(element => element.name === addVar[0]).grades[addVar[1]] = newGrade;
            }
            toggleEditing();
            break;
        case 'editSession':
            name = document.getElementById('addSess').value;
            const cleaned = deleteSpaces(name);

            if(!cleaned) {
                showMessage(text({de:`Ungültiger Name`, en:`Invalid name`}));
                return;
            }
            for (const session of subjects) {
                if(session.name == cleaned) {
                    showMessage(text({de:`Ein Schuljahr mit diesem Namen ist bereits vorhanden`, en:`A school year with this name can't exist twice`}));
                    return;
                }
            }

            subjects[addVar].name = name;
            toggleEditing();
            break;
        case 'editSubject':
            name = document.getElementById('focusedSubj').value;

            if(dir.find(element => element.name === name) && !(dir.indexOf(dir.find(element => element.name === name)) == addVar)) {
                showMessage(text({de:`Ein Fach mit diesem Namen kann nicht doppelt existieren`, en:`A subject with that name can't exist twice`}));
                return;
            }
            /*if (/\d/.test(document.getElementById('focusedSubj').value)) {
                showMessage(text({de:`Die Fächer-Bezeichnung darf keine Zahl enthalten`, en:`The subject name must not contain  any number`}));
                return;
            }
            if(document.getElementById('focusedSubj').value.includes(activeSession)) {
                showMessage(text({de:`Die Fächer-Bezeichnung kann nicht das Schuljahr enthalten`, en:`The subject can't contain the name of the year`}));
                return;
            }*/
            subjects.find(session => session.name == activeSession).grades[addVar].name = name;
            toggleEditing();
            break;
        default:
            break;
    }
    setLocalStorage(subjects, 'subjects');
    switchScene('main');
    clearInputs();
}

function clearInputs() {
    document.getElementById('focusedSubj').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('description').value = '';
    document.getElementById('schulaufgabe').checked = false;

    document.getElementById('addSess').value = '';
}

function deleteSpaces(str) {
    // Use a regular expression to match spaces preceded by either nothing, another space, or followed by a space at the end
    return str.replace(/(^ || (?= )| $)/g, '').replace(/ $/, '').replace(/^ /, ''); // This additional replace handles the case where the first character is a space
}

async function deleteData() {
    if(!(await getConfirm(text({de:`Alle gespeicherten Daten löschen?`, en:`Delete all saved data?`})))) return;
    deleteLocalStorage('subjects');

    subjects = [];
    settings = {
        lang: 'de',
        examName: 'Schulaufgaben',
        showMultiplier: false,
        darkmode: true,
        activeSession: undefined,
        seenDownloadMessage: false,
        offline: false
    }
    setLocalStorage(subjects, 'subjects');
    setLocalStorage(settings, 'settings');
    switchScene('main');
}

function toggleEditing() {
    if(editing) {
        editing = false;
        document.documentElement.style.setProperty('--editing', 'none');
        return;
    }
    editing = true;
    document.documentElement.style.setProperty('--editing', 'block');
}

function loadSession() {
    if(!subjects.length > 0) {
        emptyTable(document.getElementById('table'));
        let newTR = document.createElement('tr');
        newTR.id = 'emptyTable';
        document.getElementById('table').appendChild(newTR);

        let newTH = document.createElement('th');
        newTH.textContent = text({de:`Kein Schuljahr hinzugefügt`, en:`No school year added`});
        document.getElementById('emptyTable').appendChild(newTH);
        return;
    }
    emptyTable(document.getElementById('table'));
        let avg = [];
        subjects.forEach(session => {
            let newTR = document.createElement('tr');
            newTR.id = session.name;
            newTR.className = 'sessionTR';
            document.getElementById('table').appendChild(newTR);

            let newGrdDiv = document.createElement('div');

            let toolDiv = document.createElement('div');
            toolDiv.classList = `transparent`;

            let editBtn = document.createElement('i');
            editBtn.classList = `edit-icon editIcon`;
            toolDiv.appendChild(editBtn);

            let removeBtn = document.createElement('i');
            removeBtn.classList = `delete-icon removeIcon`;
            toolDiv.appendChild(removeBtn);

            let newSess = document.createElement('th');
            newSess.textContent = session.name;
            newGrdDiv.appendChild(toolDiv);
            newGrdDiv.appendChild(newSess);
            document.getElementById(session.name).appendChild(newGrdDiv);

            let innerAvg = getAvgArray(session.grades);
            let calcAvg = calculateAvgFromArray(innerAvg);
            if(parseFloat(calcAvg)) {
                let newAvg = document.createElement('td');
                newAvg.textContent = calcAvg;
                avg.push(parseFloat(calcAvg));
                document.getElementById(session.name).appendChild(newAvg);
            }
        });

        let newTR = document.createElement('tr');
        newTR.id = 'total';
        newTR.className = 'sessionTR';
        document.getElementById('table').appendChild(newTR);

        let newSubj = document.createElement('th');
        newSubj.textContent = text({de:`Gesamt`, en:`Total`});
        document.getElementById('total').appendChild(newSubj);

        let calcAvg = calculateAvgFromArray(avg);
        if(parseFloat(calcAvg)) {
            let newAvg = document.createElement('td');
            newAvg.textContent = calcAvg;
            document.getElementById('total').appendChild(newAvg);
        }
    replaceIcons();
}

function getAvgArray(array) {
    let avgArray = [];
    array.forEach(subject => {
        let avg = parseFloat(calculateAvg(subject.grades, subject.examWeight));
        if(avg) avgArray.push(avg);
    });
    return avgArray;
}

function switchScene(target) {
    switch (target) {
        case 'add':
            if (scene == 'addGrade' || scene == 'addSession' || scene == 'editGrade' || scene == 'editSession' || scene == 'editSubject') save();
            else if (scene == 'sessions') {
                scene = 'addSession';
                switchScene('addSession');
            }
            else {
                scene = 'addGrade';
                document.getElementById('add').style.display = 'flex';
                document.getElementById('centerbuttonicon').className = 'tick-icon';
                document.getElementById('settings').style.display = 'none';
                setChildren(document.getElementById('add'), 'display', 'block');
                document.getElementById('subjects').style.display = 'none';
                document.getElementById('addSess').style.display = 'none';
                document.getElementById('schulaufgabebox').style.display = 'flex';
                setSubjectList();
            }
            break;
        case 'addSession':
            document.getElementById('add').style.display = 'flex';
            document.getElementById('centerbuttonicon').className = 'tick-icon';
            document.getElementById('settings').style.display = 'none';
            setChildren(document.getElementById('add'), 'display', 'none');
            document.getElementById('addSess').style.display = 'block';
            break;
        case 'main':
            document.getElementById('add').style.display = 'none';
            document.getElementById('centerbuttonicon').className = 'plus-icon';
            document.getElementById('sessionLink').style.display = 'block';
            document.getElementById('settings').style.display = 'none';
            if(activeSession == undefined) {
                switchScene('sessions');
                break;
            }
            scene = 'main';
            loadSubjects();
            break;
        case 'settings':
            document.getElementById('settings').style.display = 'flex';
            document.getElementById('add').style.display = 'none';
            document.getElementById('centerbuttonicon').className = 'plus-icon';
            scene = 'settings';
            document.getElementById('lang').value = settings.lang;
            document.getElementById('examName').value = settings.examName;
            document.getElementById('showMultipliers').checked = settings.showMultiplier;
            document.getElementById('darkmode').checked = settings.darkmode;
            document.getElementById('offline').checked = settings.offline;
            break;
        case 'sessions':
            loadSession();
            document.getElementById('sessionLink').style.display = 'none';
            scene = 'sessions';
            activeSession = undefined;
            settings.activeSession = undefined;
            setLocalStorage(settings, 'settings');
            break;
        case 'editGrade':
            scene = 'editGrade';
            document.getElementById('add').style.display = 'flex';
            document.getElementById('centerbuttonicon').className = 'tick-icon';
            document.getElementById('settings').style.display = 'none';
            setChildren(document.getElementById('add'), 'display', 'block');
            document.getElementById('subjects').style.display = 'none';
            document.getElementById('addSess').style.display = 'none';
            document.getElementById('focusedSubj').style.display = 'none';
            document.getElementById('schulaufgabebox').style.display = 'none';
            break;
        case 'editSession':
            scene = 'editSession';
            document.getElementById('add').style.display = 'flex';
            document.getElementById('centerbuttonicon').className = 'tick-icon';
            document.getElementById('settings').style.display = 'none';
            setChildren(document.getElementById('add'), 'display', 'none');
            document.getElementById('addSess').style.display = 'block';
            break;
        case 'editSubject':
            scene = 'editSubject';
            document.getElementById('add').style.display = 'flex';
            document.getElementById('centerbuttonicon').className = 'tick-icon';
            document.getElementById('settings').style.display = 'none';
            setChildren(document.getElementById('add'), 'display', 'none');
            document.getElementById('focusedSubj').style.display = 'block';
            break;
    }
    document.getElementById('addVar').style.display = 'none';
    replaceIcons();
}

function setSubjectList() {
    dataList = document.getElementById('subjects');
    dataList.innerHTML = '';
    subjects.find(session => session.name == activeSession).grades.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.name;
        dataList.appendChild(option);
    });
}

function editScene(grade, slot) {
    switchScene('editGrade');

    document.getElementById('grade').value = grade.grade;
    document.getElementById('weight').value = grade.weight;
    document.getElementById('description').value = grade.description;

    document.getElementById('addVar').textContent = slot;
}

function editSessionScene(session, slot) {
    switchScene('editSession');

    document.getElementById('addSess').value = session.name;
    document.getElementById('addVar').textContent = slot;
}

function editSubjectScene(subject, slot) {
    switchScene('editSubject');

    document.getElementById('focusedSubj').value = subject.name;
    document.getElementById('addVar').textContent = slot;
}

function setChildren(parent, attribute, value) {
    parent.childNodes.forEach(child => {
        if (child.nodeType === 1) { // Ensure it's an element node
            child.style[attribute] = value;
        }
    });
}

function saveSettings() {
    if(!(document.getElementById('lang').value == settings.lang)) {
        settings.lang = document.getElementById('lang').value;
        changeLang(settings.lang);
    }
    settings.examName = document.getElementById('examName').value;
    settings.showMultiplier = document.getElementById('showMultipliers').checked;
    settings.darkmode = document.getElementById('darkmode').checked;
    settings.offline = document.getElementById('offline').checked;

    changeMode(settings.darkmode);

    setLocalStorage(settings, 'settings');
}

function changeMode(mode) {
    if (mode) {
        Array.from(document.getElementsByClassName('background')).forEach(element => {
            element.style.display = 'block';
            document.documentElement.style.setProperty('--main-color', '#fff');
        });
    }
    else {
        Array.from(document.getElementsByClassName('background')).forEach(element => {
            element.style.display = 'none';
        });
        document.documentElement.style.setProperty('--main-color', '#000');
    }
}

function changeLang(lang) {
    switch(lang) {
        case 'de':
            document.querySelector("#multiplierBox span").textContent ="Gewichtungen";
            document.querySelector("label[for='downloadButton']").textContent = 'Datei herunterladen';
            document.querySelector("label[for='fileInput']").textContent = 'Datei hochladen';
            document.querySelector("label[for='deleteButton']").textContent = 'Daten löschen';

            document.querySelector('#downloadDialog button[value="false"]').textContent = 'Nicht mehr zeigen';
            document.querySelector('#downloadDialog button[value="true"]').textContent = 'Später';
            document.querySelector('#confirmDialog button[value="false"]').textContent = 'Abbrechen';
            document.querySelector('#confirmDialog button[value="true"]').textContent = 'Ok';
            document.querySelector('#infoDialog button[value="true"]').textContent = 'Fertig';
            document.getElementById('updateGuide').textContent = 'Starte Gradia neu, um das Update zu installieren.';

            document.getElementById('addSess').placeholder = 'Schuljahr-Name';
            document.getElementById('focusedSubj').placeholder = 'Fach-Name';
            document.getElementById('grade').placeholder = 'Note';
            document.getElementById('weight').placeholder = 'Gewichtung';
            document.getElementById('description').placeholder = 'Beschreibung';
            document.querySelector('label[for="schulaufgabe"]').textContent = 'Schulaufgabe';
            break;
        case 'en':
            document.querySelector("#multiplierBox span").textContent ="Weights";
            document.querySelector("label[for='downloadButton']").textContent = 'Download file';
            document.querySelector("label[for='fileInput']").textContent = 'Upload file';
            document.querySelector("label[for='deleteButton']").textContent = 'Delete data';

            document.querySelector('#downloadDialog button[value="false"]').textContent = `Don't show again`;
            document.querySelector('#downloadDialog button[value="true"]').textContent = 'Later';
            document.querySelector('#confirmDialog button[value="false"]').textContent = 'Cancel';
            document.querySelector('#confirmDialog button[value="true"]').textContent = 'Ok';
            document.querySelector('#infoDialog button[value="true"]').textContent = 'Confirm';
            document.getElementById('updateGuide').textContent = 'Restart Gradia to install the update.';

            document.getElementById('addSess').placeholder = 'School year name';
            document.getElementById('focusedSubj').placeholder = 'Subject name';
            document.getElementById('grade').placeholder = 'Grade';
            document.getElementById('weight').placeholder = 'Weight';
            document.getElementById('description').placeholder = 'Description';
            document.querySelector('label[for="schulaufgabe"]').textContent = 'Exam';
            break;
        default:
            break;
    } 
}

function text(text) {
    return text[settings.lang];
}

function showMessage(message) {
    const dialog = document.getElementById('infoDialog');
    const messageSpan = document.getElementById('infoMessage');
    messageSpan.innerHTML = message;
    dialog.showModal();
}

function showStoragePolicy() {
    const message = text({
        de:`Gradia speichert deine Daten lokal im Browser. <p>Um einen Datenverlust im Falle der Löschung der Browser-Daten zu verhindern, solltest du deine Daten regelmäßig in den Einstellungen herunterladen. <br>Persönliche Benutzerdaten werden nicht an uns übermittelt und können daher nach Löschung nicht wiederhergestellt werden. </p><p>Wir loggen die Versionsnummer während des Installations-, und Update-Vorgangs, um die richtige Funktionalität zu validieren.</p>`, 
        en:`Gradia stores your data locally in your browser. <p> To prevent data loss in case of a deletion of your browser's data, you should download your data from time to time in the settings. <br> Personal user data isn't getting sent to us and therefore can't be restored after deletion. </p><p>We log the version number during the installation and update process to validate correct functionality.</p>`
    })

    const dialog = document.getElementById('infoDialog');
    const messageSpan = document.getElementById('infoMessage');
    document.getElementById('infoConfirm').onclick = () => seenStoragePolicy();
    messageSpan.innerHTML = message;
    dialog.showModal();
}

async function getConfirm(message) {
    const dialog = document.getElementById('confirmDialog');
    const messageSpan = document.getElementById('confirmMessage');
    messageSpan.innerHTML = message;
    const response = await dialogPromise(dialog);
    return response;
}

function dialogPromise(dialog) {
    return new Promise((resolve, reject) => {
        dialog.showModal();
        dialog.onclose = () => {
            const returnValue = (dialog.returnValue === 'true');
            resolve(returnValue);
        };
    })
}



function setLocalStorage(value, key) {
    if (typeof(Storage) !== "undefined") {
        // Retrieve the array from localStorage
        var gradiaArray = JSON.parse(localStorage.getItem('gradia')) || [];

        gradiaArray = gradiaArray.filter(item => item.key !== key);

        // Push new value with key into the array
        gradiaArray.push({ key: key, value: value });

        // Convert the updated array back into a string and set it in localStorage
        localStorage.setItem('gradia', JSON.stringify(gradiaArray));
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
}

function deleteLocalStorage(key) {
    var gradiaArray = JSON.parse(localStorage.getItem('gradia')) || [];

    gradiaArray = gradiaArray.filter(item => item.key !== key);

    localStorage.setItem('gradia', JSON.stringify(gradiaArray));
}

function getLocalStorageValue(key) {
    if (typeof(Storage) !== "undefined") {
        // Retrieve the gradia array from localStorage
        const gradiaArray = JSON.parse(localStorage.getItem('gradia')) || [];

        // Find the item with the given key in the gradia array
        const item = gradiaArray.find(item => item.key === key);

        if (item) {
            // Return the value associated with the given key
            return item.value;
        } else {
            console.log(`No value found for key '${key}' in the gradia localstorage.`);
            return null;
        }
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
        return null;
    }
}

function checkLocalStorage() {
    if(localStorage.getItem('gradia') !== null) return true;

    setLocalStorage([], 'gradia');
    setLocalStorage([],'subjects');
    setLocalStorage(settings, 'settings');
}




function downloadTxtFile(array, fileName) {
    // Convert array elements to strings and join them with newline characters
    const text = JSON.stringify(array);

    // Create a Blob object
    const blob = new Blob([text], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');

    // Set link's attributes
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Append link to the body
    document.body.appendChild(link);

    // Trigger a click event on the link
    link.click();

    // Cleanup: remove the link
    document.body.removeChild(link);
}








function setCookie(value) {
    // Serialize the value to a JSON string
    const jsonString = JSON.stringify(value);

    // Calculate the expiration date
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    // Convert the JSON string to a URI-encoded string
    const encodedValue = encodeURIComponent(jsonString);

    // Create the cookie string
    const cookieString = `subjects=${encodedValue}; expires=${expirationDate.toUTCString()}; path=/`;

    // Set the cookie
    document.cookie = cookieString;
}

function getCookieValue(cookieName) {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');

        if (name === cookieName) {
            // Decode the cookie value
            const decodedValue = decodeURIComponent(value);

            // Check if the value is JSON encoded
            try {
                const parsedValue = JSON.parse(decodedValue);
                return parsedValue; // Return the parsed array
            } catch (error) {
                // If JSON parsing fails, return the decoded value as is
                return decodedValue;
            }
        }
    }

    return null; // Cookie not found
}



function checkCookie() {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'subjects') {
            return true;
        }
    }

    return false;
}

function appChannel(type, message, purpose, identifier) {
    const channel = new BroadcastChannel('app_channel');
    channel.postMessage({
        from: 'gradia',
        type,
        message,
        purpose,
        identifier
    })
}

function identifierCode() {
    return Math.floor(1000 + Math.random() * 9000);
}

async function showDownloadMessage() {
    if(navigator.standalone) return;
    if(settings.seenDownloadMessage === true) return;
    settings.seenDownloadMessage = new Date(settings.seenDownloadMessage); // converting string back to date object
    if((new Date - settings.seenDownloadMessage) / 3600000 < 168) return; // less than 7 days

    const userAgent = navigator.userAgent;
    /*if(userAgent.includes('iPhone') && window.innerWidth < window.innerHeight) { //iPhone
        alert("iPhone")
        message.style.display = 'flex';
        message.style.justifyContent = 'center';
        message.style.top = '90dvh';
    }
    else if(userAgent.includes('iPhone') && window.innerWidth > window.innerHeight) { //landscape iPhone
        alert("landscape iOS");
        message.style.display = 'flex';
        message.style.justifyContent = 'flex-end';
        message.style.top = '0';
    }
    else if(userAgent.includes('Mac') && "ontouchend" in document) { // iPad
        alert("iPad");
        message.style.display = 'flex';
        message.style.justifyContent = 'flex-end';
        message.style.top = '0';
        document.querySelector('#downloadMessage > *').style.margin = '0 135px';
    }
    else alert(navigator.userAgent);*/

    const downloadMessage = {
        de:`Installiere Gradia auf deinem Gerät: <p>Für einen schnellen Zugriff auf Gradia, direkt von deinem Homebildschirm aus, <br>tippe <i class="ios-share-icon" data-color="#ee82ee"></i> und wähle <i>Zum Homebildschirm hinzufügen</i></p>`,
        en:`Install Gradia on your device: <p>For quick access to Gradia, right from your homescreen, <br>tap <i class="ios-share-icon" data-color="#ee82ee"></i> and choose <i>Add to homescreen</i></p>`
    }

    const result = await getDownloadResult(text(downloadMessage));
    if(result) settings.seenDownloadMessage = new Date();
    else settings.seenDownloadMessage = true;
    
    setLocalStorage(settings, 'settings');
}

async function getDownloadResult(message) {
    const dialog = document.getElementById('downloadDialog');
    const messageSpan = document.getElementById('downloadMessage');
    messageSpan.innerHTML = message;
    replaceIcons();
    const response = await dialogPromise(dialog);
    return response;
}

function seenStoragePolicy() {
    settings.seenStoragePolicy = true;
    setLocalStorage(settings, 'settings');
    document.getElementById('infoConfirm').onclick = '';
}

function languageList(array) {
    let prefIndex = Infinity;
    supportedLanguages.forEach(lang => {
        const index = array.indexOf(lang);
        if(index >= 0 & index < prefIndex) prefIndex = index;
    });
    return array[prefIndex];
}

function singleLanguage(string) {
    let result;
    supportedLanguages.forEach(lang => {
        if(string.includes(lang)) result = lang;
    });
    return result;
}


//----- SERVICE WORKER HANDLING -----//

async function registerSW() {
    if(!(`serviceWorker` in navigator)) {//Check browser support
        document.getElementById('offlineBox').style.display = 'none';
        return false; 
    }
    try {
        const registration = await navigator.serviceWorker.register(`sw.js`);

        if(registration.installing) console.log("SW installing");
        else if(registration.waiting) console.log("SW ready");
        else if(registration.active) console.log("SW active");

        const channel = new BroadcastChannel('sw_channel');
        channel.onmessage = (event) => {
            if(event.data.from !== 'SW') return;
            console.log(`Received channelmessage ${event.data}`);
            handleUpdate(event.data);
        }
    }
    catch(error) {
        console.log(`Registration failed with ${error}`);
        return error;
    }
}

function handleUpdate(updateData) {
    if(updateData.version == buildVersion) return;
    document.getElementById('updateInfo').style.display = 'block';
    const info = updateData.info;
    let output = ``;
    console.log(`${text({de:`Ein neues Update ist verfügbar:`, en:`A new update is available:`})} ${updateData.version}
    ${info.description}
    ${info.features.forEach(feature => {
        return `${feature.name} - ${feature.description}
        `
    })}
    ${info.release}`)

    document.getElementById('updateDate').textContent = info.release.toLocaleDateString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit'});
    document.getElementById('updateVersion').textContent = updateData.version;
    output += text(info.description);
    if(info.features) {
        output += `<ul>`;
        info.features.forEach(feature => {
            output += `<li><b>${text(feature.name)}</b><p>${text(feature.description)}</p></li>`
        });
        output += `</ul>`;
    }
    document.getElementById('updateDescription').innerHTML = output;
    console.log(output);
}




//----- CHECKS FOR HEADLESS BROWSERS/CRAWLERS -----//

const isCrawler = () => {
    if(navigator.webdriver === true) return true;
    
    const crawlerPatterns = [
        /bot/i,
        /crawl/i,
        /spider/i,
        /slurp/i,
        /mediapartners/i,
        /yandex/i,
        /baidu/i,
        /facebookexternalhit/i,
        /linkedinbot/i,
        /embedly/i,
        /quora/i,
        /pingdom/i,
        /monitor/i,
        /dataminr/i,
        /headless/i,
        /phantomjs/i,
        /chrome-lighthouse/i,
        /page speed/i,
    ];
    
    return crawlerPatterns.some((pattern) => pattern.test(navigator.userAgent));
};




//----- SENDS LOG DATA -----//

async function sendLogData(logType) {
    const versionData = {
        app_name: "gradia",
        version: buildVersion,
        new_users: 0,
        standalone_apps: 0,
        updated_apps: 0
    };

    switch(logType) {
        case 'new_user':
            versionData.new_users ++;
            break;
        case 'standalone':
            versionData.standalone_apps ++;
            break;
        case 'updated':
            versionData.updated_apps ++;
            break;
        default:
            return;
    }

    try {
        const response = await fetch('https://logs.jvdesign.workers.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(versionData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Response from worker:', result);
    } 
    catch (error) {
        console.error('Failed to send version data:', error);
    }
}


//----- CALLED ON EVERY LOAD -----//

window.onload = () => {
    init();
};

function init() {
    document.querySelectorAll('.autosave').forEach(element => {
        element.addEventListener('input', (event) => {
            save();
        })
    });
    document.getElementById('table').addEventListener('click', async function(e) {
        const target = e.target.closest('tr');
        const icon = e.target.closest('i');
        if(icon && icon.classList.contains('editIcon')) {
            const id = target.id;
            /*let subjectName = id.replace(new RegExp(activeSession, 'g'), ''); //removes activeSession from name string
            let subject = subjectName.replace(/\d+$/, ''); // string with removed numbers at the end
            let index = subjectName.match(/\d+$/); //int with only the numbers at the end*/
            const data = target.dataset;
            let subject = data.name;
            let index = data.count;
            let index2 = data.innerCount;
            let grade;

            if(scene == 'sessions') { //if session
                let session = subjects.find(element => element.name == id);
                let index = subjects.indexOf(session);
                editSessionScene(session, index);
                return;
            }

            if(!index) { //if no index: subject instead of 
                let dir = subjects.find(session => session.name === activeSession).grades;
                let subjectObj = dir.find(element => element.name === subject);
                let index = dir.indexOf(subjectObj);
                editSubjectScene(subjectObj, index);
                return;
            }

            if(index2) { //2 indices means Schulaufgabe
                grade = subjects.find(element => element.name === activeSession).grades.find(element => element.name === subject).grades[index][index2];
            }
            else {
                grade = subjects.find(element => element.name === activeSession).grades.find(element => element.name === subject).grades[index];
            }

            editScene(grade, `["${subject}", ${index}${index2 ? `, ${index2}` : ``}]`);
        }
        else if (icon && icon.classList.contains('removeIcon')) {
            const id = target.id;
            /*let subjectName = id.replace(new RegExp(activeSession, 'g'), ''); //removes activeSession from name string
            let subject = subjectName.replace(/\d+$/, ''); // string with removed numbers at the end
            let index = subjectName.match(/\d+$/); //int with only the numbers at the end*/
            const data = target.dataset;
            let subject = data.name;
            let index = data.count;
            let index2 = data.innerCount;
            let subjectsIndex;
            let dir;

            if(scene == 'sessions') { //if session
                dir = subjects;
                const session = subjects.find(session => session.name == id);
                subjectsIndex = subjects.indexOf(session);
            }
            else {
                dir = subjects.find(element => element.name === activeSession).grades;

                if(!index) { //if no index: subject instead of grade
                    let grade = dir.find(element => element.name === subject);
                    subjectsIndex = dir.indexOf(grade);
                }
                else if(index2) {
                    dir = dir.find(element => element.name === subject).grades[index];
                    subjectsIndex = dir[index2];
                }
                else {
                    dir = dir.find(element => element.name === subject).grades;
                    subjectsIndex = index;
                }
            }

            if(!(await getConfirm(`Really delete?`))) return;
            dir.splice(subjectsIndex, 1)
            setLocalStorage(subjects, 'subjects');
            toggleEditing();
            if(scene == 'sessions') {
                loadSession();
                return;
            }
            loadSubjects();
        }
        else if (target && target.tagName === 'TR') {
            if(target.className.includes('sessionTR') && !(target.id == 'total')) {
                activeSession = target.id;
                settings.activeSession = activeSession;
                setLocalStorage(settings, 'settings');
                document.getElementById('sessionLink').textContent = '< ' + activeSession;
                switchScene('main');
            }
            else {
                var id = target.id;
                var elements = document.getElementsByClassName(id);
                if(!(elements.length == 0)) {
                    toggleAll(elements);
                    if(!(/.*\d$/.test(id))) { //false if digit on last position
                        for (var i = 0; i < elements.length; i++) {
                            let className = elements[i].className;
                            if (className.includes('inExam')) elements[i].style.display = 'none';
                        };
                    }
                }
                /*else {
                    if(!editing) return;
                    console.log(id);
                    let subjectName = id.replace(new RegExp(activeSession, 'g'), '');
                    let subject = subjectName.replace(/\d+$/, ''); // string with removed numbers at the end
                    let index = subjectName.match(/\d+$/); //int with only the numbers at the end

                    console.log(subjectName + '; ' + subject + '; ' + index);

                    let grade = subjects.find(element => element.name === activeSession).grades.find(element => element.name === subject).grades[index];

                    editScene(grade, `["${subject}", ${index}]`);
                }*/
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        switch (event.key) {
            case 'Enter':
                if(!(document.getElementById('add').style.display == 'none')) save();
                if(!(document.getElementById('settings').style.display == 'none')) saveSettings();
                break;
        
            default:
                break;
        }
    });

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function(e) {
            const fileContent = e.target.result;
            // Split the file content into an array (assuming each line is an element)
            const dataArray = fileContent.split('\n');
            
            // Process the array or do something with the data
            subjects = JSON.parse(dataArray);
            setLocalStorage(subjects, 'subjects');
            switchScene('main');
        };
    
        reader.readAsText(file);
    });

    const app_channel = new BroadcastChannel('app_channel');
    app_channel.onmessage = (event) => {
        const data = event.data;
        const identifier = broadcastID.indexOf(data.identifier)
        if(data.from === 'gradia' && data.type === 'response' && data.purpose === 'replaceSettings' && identifier >= 0) {
            broadcastID.splice(identifier, 1);
            console.log(data);
            settings = data.message;
            setLocalStorage(settings, 'settings');
            loadSession();
        }
        if(data.from === 'gradia' && data.type === 'request' && data.message === 'settings' && identifier < 0) {
            app_channel.postMessage({
                from: 'gradia',
                type: 'response',
                message: settings,
                purpose: data.purpose,
                identifier: data.identifier
            })
        }
    }
    const knownUser = checkLocalStorage();
    if(knownUser) {
        subjects = getLocalStorageValue('subjects');
        settings = getLocalStorageValue('settings');
    }

    if(!settings.lang) {
        settings.lang = languageList(window.navigator.languages) || singleLanguage(window.navigator.language) || 'en';
    }

    if(!(settings.lang == 'de')) {
        document.documentElement.lang = settings.lang;
        changeLang(settings.lang);
    }

    /*else {
        const identifier = identifierCode();
        broadcastID.push(identifier);
        appChannel('request', 'settings', 'replaceSettings', identifier);
    }*/

    if(settings.activeSession == undefined && subjects.length > 0) activeSession = subjects[subjects.length - 1].name;
    else if (!(settings.activeSession == undefined)) activeSession = settings.activeSession;
    else activeSession = undefined;

    if(!(activeSession == undefined)) {
        document.getElementById('sessionLink').textContent = '< ' + activeSession;
        loadSubjects();
    }
    else {
        switchScene('sessions');
    }

    changeMode(settings.darkmode);
    replaceIcons();


    document.getElementById('buildVersion').textContent = buildVersion;

    document.getElementById('loading-screen').style.display = 'none';

    if(!settings.seenStoragePolicy) {
        showStoragePolicy();
    }
    if(!knownUser) {
        if(navigator.standalone) sendLogData('standalone');
        else if(!isCrawler()) sendLogData('new_user');
    }
    showDownloadMessage();

    if(!settings.offline) registerSW();
}