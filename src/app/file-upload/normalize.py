import re
from CustMatcher.rules import US_STATE_NAMES, ORG_NORM_PATTERN, US_STATE_PARENTHESIS_RE

from cleanco import basename

class NormalizeName :
    
    def __init__(self):
        self.US_STATE_NAMES = US_STATE_NAMES
        self.ORG_NORM_PATTERN = ORG_NORM_PATTERN
        self.US_STATE_PARENTHESIS_RE = US_STATE_PARENTHESIS_RE
        self.TAIL_REMOVAL_RE = re.compile(r"[^\.\w]+$", flags=re.UNICODE)

    def strip_tail(self, name):
        "get rid of all trailing non-letter symbols except the dot"
        match = re.search(self.TAIL_REMOVAL_RE, name)
        if match is not None:
            name = name[: match.span()[0]]
        return name 

    """
    Clean and standardize legal suffix
    """
    def clean_suffix(self, name):  
        for search_string, replacement_string in self.ORG_NORM_PATTERN:
            # logging.debug(f"Std Abbr [{name}] [{search_string}] [{replacement_string}]")
            name = re.sub('(?<!\w)' + search_string + '(?!\w)'
                        , ' '+ replacement_string
                        , name 
                        , flags=re.IGNORECASE
            )
        return name.strip()

    def trim_legal_siffix(self, bname):
        ''' 
        This function extracts the basename from any company.
        Basename is the name of the company, without suffixes like LLC, INC, etc.
        ''' 
        base_name = basename(bname)

        return base_name

    """
    [summary]
    """
    def strip_punct(self, name):
        return name.replace(".", "").replace(",", "").replace("-", "").replace("'", "")


        
    """[summary]
    """
    def remove_state_suffix(self, name):
        """Suffixes in the form: (State Name)"""        
        return re.sub(self.US_STATE_PARENTHESIS_RE, '', name)
        

    """
    Clean compnay names
    """
    def pre_process(self, name):
        """
        Do a little bit of data cleaning with the help of Unidecode and Regex.
        Things like casing, extra spaces, quotes and new lines can be ignored.
        """
        # print(name)
        name = str(name)
        name=re.sub('\([^)]*\)', ' ', name)
        # name = unidecode(name)
        name = self.clean_suffix(name)
        name = re.sub('\s+', ' ', name)
        name = re.sub(r'\n', r' ', name)
        name = re.sub(',', ' ', name)
        name = re.sub('-', ' ', name)
        name = re.sub('"', ' ', name)
        name=re.sub("#","",name)
        name = re.sub('[/\\\]+', '/', name)
        name = name.strip().strip('"').strip("'").strip('.').strip(',').lower().strip()
        name = self.clean_suffix(name)
        name = self.strip_punct(name)
        name = self.remove_state_suffix(name)
        name = name.strip().strip('"').strip("'").strip('.').strip(',').lower().strip()
        name = self.strip_tail(name)
        name = re.sub('\s+', ' ', name)
        name=re.sub(" +$","",name)
        name=name.replace("&"," ")
        name=name.replace("!","")
        name=re.sub(' +', ' ',name)
        # If data is missing, indicate that by setting the value to `None`
        if not name:
            name = None
        return name

