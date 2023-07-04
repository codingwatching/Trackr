
ApiEndpoint="http://wryneck.cs.umanitoba.ca/api/values"

function AddSingleValue() {
    local apiKey="$1"
    local fieldId="$2"
    local value="$3"

    if ! [[ "$apiKey" =~ ^[[:alnum:]]{64}$ ]]; then
        echo "Invalid apiKey. Please provide a valid 64-character alphanumeric string."
        exit 1
    fi

    local data='{"apiKey":"'"$apiKey"'","value":"'"$value"'","fieldId":'"$fieldId"'}'
    response=$(curl -s -X POST "$ApiEndpoint" --header "Content-Type: application/json" --data "$data")
    echo "$response"
}

function AddManyValues() {
    local apiKey="$1"
    local fieldId="$2"
    local values=("${@:3}")

    if ! [[ "$apiKey" =~ ^[[:alnum:]]{64}$ ]]; then
        echo "Invalid apiKey. Please provide a valid 64-character alphanumeric string."
        exit 1
    fi

    for value in "${values[@]}"; do
        echo "Adding value: $value"
        response=$(AddSingleValue "$apiKey" "$fieldId" "$value")
        echo "Response: $response"
        sleep 1
    done
}

function GetValues() {
    local apiKey="$1"
    local fieldId="$2"
    local offset="$3"
    local limit="$4"
    local order="$5"

    if ! [[ "$apiKey" =~ ^[[:alnum:]]{64}$ ]]; then
        echo "Invalid apiKey. Please provide a valid 64-character alphanumeric string."
        exit 1
    fi

    if [[ "$order" != "asc" && "$order" != "desc" ]]; then
        echo "Order must be 'asc' or 'desc'. Please try again."
        exit 1
    fi

    local params="apiKey=$apiKey&fieldId=$fieldId&offset=$offset&limit=$limit&order=$order"
    response=$(curl -s -X GET "$ApiEndpoint?$params")
    echo "$response"
}